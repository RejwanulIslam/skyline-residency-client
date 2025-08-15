import { useQuery } from '@tanstack/react-query'
import useAxiosPublick from './useAxiosPublick'

export default function useTanStackQuery(path, queryKey) {
  const axiosPublick=useAxiosPublick()
  const { data,refetch,isPending } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const res = await axiosPublick.get(path)
      return res.data
    }
  })
  return {data,refetch,isPending}
}
