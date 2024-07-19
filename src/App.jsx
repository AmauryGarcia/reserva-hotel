import "/app.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Route, Switch } from "wouter";
import { Toaster } from "react-hot-toast";
import HotelList from "./components/HotelList"
import HotelDetails from "./components/HotelDetails";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <QueryClientProvider client={new QueryClient()}>
        <Switch>
          <Route path="/" component={HotelList} />
          <Route path="/hotel/:id" component={HotelDetails} />
        </Switch>
      </QueryClientProvider>
    </>
  )
}

export default App
