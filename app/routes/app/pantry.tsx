import type { PantryShelf } from "@prisma/client";
import classNames from "classnames";
import {
  useLoaderData,
  type LoaderFunction,
  type LoaderFunctionArgs,
  useSearchParams,
} from "react-router";
import { getAllShelves } from "~/models/pantry-shelves";
import { FiSearch } from "react-icons/fi";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || "";
  const shelves = await getAllShelves(q);
  return { shelves };
}

export default function Pantry() {
  const { shelves } = useLoaderData();
  const [searchParams] = useSearchParams();
  return (
    <div>
      <form className="flex border-2 border-gray-300 rounded-md focus-within:border-green-500 md:w-80">
        <button className="px-2">
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
      </form>
      <ul
        className={classNames(
          "flex gap-8 overflow-x-auto",
          "snap-x snap-mandatory"
        )}
      >
        {shelves.map((shelf: PantryShelf) => (
          <li
            key={shelf.id}
            className={classNames(
              "border-2 border-primary rounded-md p-4",
              "w-[calc(100vw-2rem)] flex-none"
            )}
          >
            <h1 className="text-2xl font-extrabold">{shelf.name}</h1>
          </li>
        ))}
      </ul>
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
