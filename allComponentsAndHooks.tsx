import React from "react";
import { Await, useActionData, useLoaderData, useLocation, useNavigate, useNavigation, useResolvedPath, useRouteError, useRouteLoaderData } from "react-router";


// hooks 

useResolvedPath()
useActionData()
useLoaderData()
useRouteLoaderData()
useRouteError()
useLocation()
useNavigate()
useNavigation()

// components
import { Link, Outlet,NavLink } from "react-router";



// async components 
export function ComponentWithLoadingIndicator({ data,loadingIndicator,children }: { data:any,loadingIndicator:String,children: React.ReactNode }) {
  const navigation = useNavigation();
  return (
    <React.Suspense fallback={<p>{loadingIndicator ? loadingIndicator :"Loading..."}</p>}>
        <Await resolve={data}>
          {(value) => (
            <div>
              {value}
            </div>
          )}
        </Await>
    </React.Suspense>
  )

}