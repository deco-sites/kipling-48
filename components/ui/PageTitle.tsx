import { IS_BROWSER } from "https://deno.land/x/fresh@1.1.3/runtime.ts";
import { useEffect, useState } from "preact/hooks";

const PageTitle = () => {
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    if (IS_BROWSER) {
      const url = new URL(window.location.href);
      const pathArray = url.pathname.split("/");
      const name = pathArray[pathArray.length - 1].replaceAll("-", " ");
      setTitle(name);
    }
  }, []);

  return (
    <div className="mt-4">
      <h1 className="text-4xl text-white font-thin capitalize">{title}</h1>
    </div>
  );
};

export default PageTitle;
