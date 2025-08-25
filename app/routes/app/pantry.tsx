// import type { PantryShelf } from "@prisma/client";
import classNames from "classnames";
import {
  useLoaderData,
  // type LoaderFunction,
  type LoaderFunctionArgs,
  useSearchParams,
  Form,
  useNavigation,
  useFetcher,
  redirect,
} from "react-router";
import { getAllShelves } from "~/models/pantry-shelves";
import { FiSearch } from "react-icons/fi";
import { DeleteButton, PrimaryButton } from "~/components/button/button";
import { BiDownload, BiPlus } from "react-icons/bi";
import { createPantryShelf } from "~/models/create-pantry-shelf";
import { useEffect, useRef } from "react";
import { deleteShelf } from "~/models/delete-shelf";
import db from "~/db.server";
// import { Notify } from "~/components/notifications/notify";
import { updateShelfName } from "~/models/updateNameOfShelf";

type FieldErrors = {
  [key: string]: string | undefined;
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || "";
  const deletedShelf = url.searchParams.get("deletedShelf") || "";
  const shelves = await getAllShelves(q);
  return { shelves, deletedShelf };
}

export async function action({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  switch (formData.get("_action")) {
    // case "deleteShelf": {
    //   const shelfId = formData.get("shelfId");
    //   if (typeof shelfId !== "string") {
    //     return { errors: { shelfId: "Invalid shelf ID" } };
    //   }
    //   if (shelfId) {
    //     return deleteShelf(shelfId);
    //   }
    //   break;
    // }
    case "deleteShelf": {
      const shelfId = formData.get("shelfId");
      if (typeof shelfId !== "string") {
        return { errors: { shelfId: "Invalid shelf ID" } };
      }
      if (shelfId) {
        // Get the shelf name before deleting
        const shelf = await db.pantryShelf.findUnique({
          where: { id: shelfId },
        });
        const deletedShelfName = shelf?.name || "";
        await deleteShelf(shelfId);
        // Redirect with deletedShelf query param
        const url = new URL(request.url);
        url.searchParams.set("deletedShelf", deletedShelfName);
        return redirect(url.toString());
      }
      break;
    }
    case "createShelf": {
      const shelfName = formData.get("shelfName") || "Vegetables";
      if (typeof shelfName !== "string") {
        return { errors: { shelfName: "Invalid shelf name" } };
      }
      if (shelfName) {
        return createPantryShelf(shelfName);
      }
      break;
    }
    case "saveShelfName": {
      const shelfId = formData.get("shelfId");
      const shelfName = formData.get("shelfName");
      const errors: FieldErrors = {};
      if (
        typeof shelfId === "string" &&
        typeof shelfName === "string" &&
        shelfName !== ""
      ) {
        return updateShelfName(shelfId, shelfName);
      }

      if (typeof shelfName !== "string") {
        errors["shelfName"] = "Shelf name must be a string";
      }

      if (shelfName === "") {
        errors["shelfName"] = "Shelf name cannot be blank";
      }

      if (typeof shelfId !== "string") {
        errors["shelfId"] = "Shelf ID must be a string";
      }
      return { errors };
    }
    default: {
      return null;
    }
  }
}

export default function Pantry() {
  const { shelves, deletedShelf } = useLoaderData();
  const [searchParams] = useSearchParams();
  const navigation = useNavigation();
  const createShelfFetcher = useFetcher();
  const isSearching = navigation.formData?.has("q");
  const isCreatingShelf =
    createShelfFetcher.formData?.get("_action") === "createShelf";
  const containerShelf = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!isCreatingShelf && containerShelf.current) {
      containerShelf.current.scrollLeft = 0;
    }
  }, [isCreatingShelf]);

  return (
    <div>
      {/* {deletedShelf && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-red-800 rounded">
          Shelf <strong>{deletedShelf}</strong> Was Deleted!
        </div>
      )} */}
      <Form
        className={classNames(
          "flex border-2 border-gray-300 rounded-md focus-within:border-green-500 md:w-80 mb-1",
          {
            "animate-pulse": isSearching,
          }
        )}
      >
        <button className="px-2" type="submit">
          <FiSearch />
        </button>
        <input
          defaultValue={searchParams.get("q") || ""}
          type="text"
          name="q"
          autoComplete="off"
          placeholder="Search Shelves..."
          className="w-full py-3 px-2 outline-none"
        />
      </Form>
      <createShelfFetcher.Form className="mb-5" method="post">
        <PrimaryButton
          className={classNames("mt-4 w-full md:w-fit", {
            "bg-green-200": isCreatingShelf,
          })}
          value="createShelf"
          name="_action"
          isLoading={isCreatingShelf}
          disabled={isCreatingShelf}
        >
          <BiPlus />
          <span className="pl-2">
            {isCreatingShelf ? "Creating Shelf ..." : "Create Shelf"}
          </span>
        </PrimaryButton>
      </createShelfFetcher.Form>
      <div className="snap-x snap-mandatory">
        <ul
          className={classNames(
            "flex gap-4 overflow-x-auto",
            "snap-x snap-mandatory md:snap-none"
          )}
          ref={containerShelf}
        >
          {shelves.map((shelf: any) => {
            return <Shelf key={shelf.id} shelf={shelf} />;
          })}
        </ul>
      </div>
    </div>
  );
}

export function PantryTable({ data }: { data: any }) {
  if (!data || data.length === 0) {
    return <div className="text-gray-500">No pantry items found.</div>;
  }
  return (
    <div className="overflow-x-auto rounded-lg shadow border border-gray-200 bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-indigo-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Shelf
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Item
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Quantity
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Unit
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {(data as any).shelves.map((shelf: any) => {
            const shelfItems = (data as any).items.filter(
              (item: any) => item.shelfId === shelf.id
            );
            return shelfItems.length > 0 ? (
              shelfItems.map((item: any, idx: number) => (
                <tr
                  key={item.id}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  {idx === 0 && (
                    <td
                      rowSpan={shelfItems.length}
                      className="px-6 py-4 font-medium text-indigo-800 align-top border-r border-gray-100"
                    >
                      {shelf.name}
                    </td>
                  )}
                  <td className="px-6 py-4 text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 text-gray-700">{item.quantity}</td>
                  <td className="px-6 py-4 text-gray-700">{item.unit}</td>
                </tr>
              ))
            ) : (
              <tr key={shelf.id}>
                <td className="px-6 py-4 font-medium text-indigo-800 border-r border-gray-100">
                  {shelf.name}
                </td>
                <td className="px-6 py-4 text-gray-400 italic" colSpan={3}>
                  No items
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

type ShelfProps = {
  shelf: {
    id: string;
    name: string;
    items: {
      id: string;
      name: string;
      quantity: number;
      unit: string;
    }[];
  };
};

function Shelf({ shelf }: ShelfProps) {
  const deleteShelfFetcher = useFetcher();
  const isDeletingShelf =
    deleteShelfFetcher.formData?.get("_action") === "deleteShelf" &&
    deleteShelfFetcher.formData?.get("shelfId") === shelf.id;
  const saveShelfName = useFetcher();
  return (
    <li
      key={shelf.id}
      className={classNames(
        "border-2 border-primary rounded-md p-4 h-fit",
        "w-[calc(100vw-2rem)] flex-none snap-center",
        "md:w-96"
      )}
    >
      <saveShelfName.Form method="post" className="mb-4 flex">
        <input
          className={classNames(
            "text-2xl font-extrabold mb-2 w-full outline-none",
            "border-b-white focus:border-b-2 focus:border-green-500 pb-1"
          )}
          defaultValue={shelf.name}
          name="shelfName"
          placeholder="Shelf Name"
          autoComplete="off"
        />
        <button name="_action" value="saveShelfName" className="ml-4 cursor-pointer text-2xl hover:text-green-500">
          <BiDownload />
        </button>
        <input type="hidden" name="shelfId" value={shelf.id} />
      </saveShelfName.Form>
      <ul className="space-y-2">
        {shelf.items && shelf.items.length > 0 ? (
          shelf.items.map((item: any) => (
            <li
              key={item.id}
              className="flex justify-between items-center border-b border-gray-100 pb-1"
            >
              <span className="font-medium">{item.name}</span>
              <span className="text-gray-600 text-sm">
                {item.quantity} {item.unit}
              </span>
            </li>
          ))
        ) : (
          <li className="text-gray-400 italic">No items</li>
        )}
      </ul>
      <deleteShelfFetcher.Form method="post" className="pt-8">
        <input type="hidden" name="shelfId" value={shelf.id} />
        <DeleteButton
          className="w-full"
          value="deleteShelf"
          name="_action"
          isLoading={isDeletingShelf}
          disabled={isDeletingShelf}
        >
          {isDeletingShelf ? "Deleting Shelf ..." : " Delete Shelf"}
        </DeleteButton>
      </deleteShelfFetcher.Form>
    </li>
  );
}
