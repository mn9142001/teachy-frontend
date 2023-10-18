import BlockDisplay from "../components/main/block";
import { LATEST_COURSES } from "../utils/constants";

function App() {
  let blocks_data = [
    {
      title : "أشهر الكورسات",
      queryKey : "famous_courses",
      url : _ => {
        let url = LATEST_COURSES
        url.searchParams.append("sort_by", "random")
        return url
      }
    },
    {
      title : "اخر الكورسات",
      url : _ => LATEST_COURSES,
      queryKey : "latest_courses"
    },
  ]


  return <div className="p2 flex flex-col">
        {
          blocks_data.map((item, key) => {
            return <BlockDisplay key={key} queryKey={item.queryKey} title={item.title} url={item.url()}  />
          })
        }
  </div>

}

export default App;
