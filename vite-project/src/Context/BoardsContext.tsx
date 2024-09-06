import { createContext, useContext } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
const url = `/api/boards`;

const BoardsContext = createContext([]);


function useBoardsProvider(){
    const fetchBoards = () => {
        return axios.get(url).then((res) => {
          return res.data.list;
        });
      };
      const { data: boards, error } = useQuery({
        queryKey: ["boards"],
        queryFn: () => fetchBoards(),
      });
      if (error) {
        console.log(error);
      }
      return boards;
}
type ProviderProps = {
    children: React.ReactNode;
}
export default function BoradsProvider({children}:ProviderProps){
    const value = useBoardsProvider()
    return <BoardsContext.Provider value={value}>{children}</BoardsContext.Provider>
}

export function useBorads(){
    const context = useContext(BoardsContext);
    /* if(context === undefined){
        throw new Error('BoardsProvier requeried');
    } */
    return context;
}



