import { useRouteError } from "react-router"

export default function Error(){
    const error = useRouteError();
    return <div>
        <h1>Error</h1>
        <p1>{error.statusText || error.message}</p1>
    </div>
}