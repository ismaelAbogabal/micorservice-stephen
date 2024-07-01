import PostCreate from "./Components/PostCreate";
import PostsList from "./Components/PostLIst";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

console.log(process.env);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container">
        <h1>App</h1>
        <PostCreate />
        <hr />
        <PostsList />
      </div>
    </QueryClientProvider>
  );
}
