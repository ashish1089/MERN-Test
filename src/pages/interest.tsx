import { useState, useEffect } from "react";
import { api } from "~/utils/api";

interface Interest {
  id: number;
  name: string;
}

export default function Interest() {
  const [currentInterest, setCurrentInterest] = useState(0);
  const [currentPageGroup, setCurrentPageGroup] = useState(0); // Track current page group
  const res = api.interest.get.useQuery();
  const interest: Interest[] | undefined = res.data;

  const chunk = (arr: Interest[], size: number) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size),
    );

  const Items_6 = interest ? chunk(interest, 6) : [];

  useEffect(() => {
    const currentPageGroup = Math.floor(currentInterest / 7);
    setCurrentPageGroup(currentPageGroup);
  }, [currentInterest]);

  const firstPage = () => {
    setCurrentInterest(0);
  };

  const lastPage = () => {
    setCurrentInterest(Items_6.length - 1);
  };

  const prevPage = () => {
    if (currentInterest > 0) {
      setCurrentInterest(currentInterest - 1);
    }
  };

  const nextPage = () => {
    if (currentInterest < Items_6.length - 1) {
      setCurrentInterest(currentInterest + 1);
    }
  };

  const pageGroupStart = currentPageGroup * 7;
  const pageGroupEnd = Math.min(pageGroupStart + 7, Items_6.length);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = pageGroupStart; i < pageGroupEnd; i++) {
      pageNumbers.push(
        <span
          key={i}
          className={`cursor-pointer pr-2 hover:text-black ${
            i === currentInterest ? "font-bold text-black" : "text-[#ACACAC]"
          }`}
          onClick={() => setCurrentInterest(i)}
        >
          {i + 1}
        </span>,
      );
    }
    return pageNumbers;
  };

  return (
    <>
      <div className="mx-auto mt-16 h-[658px] w-[576px] rounded-[20px] border-2 border-[#c1c1c1] px-[60px] pt-8">
        <h1 className="mt-6 pb-6 text-center text-[32px] font-semibold">
          Please mark your interests!
        </h1>
        <p className="pt-2 text-center">We will keep you notified.</p>
        <p className="mt-8 text-xl font-medium">My saved interests!</p>
        <form className="mt-6 h-60 w-96">
          <ul className="flex flex-col gap-4 align-middle">
            {Items_6[currentInterest]?.map((item) => (
              <li key={item.id} className="flex gap-2">
                <input
                  type="checkbox"
                  className="h-[28px] w-[26px] checked:bg-black"
                />
                {item.name}
              </li>
            ))}
          </ul>
        </form>

        <div className="mt-8 flex gap-[.8rem] align-middle text-[#ACACAC]">
          <button className=" hover:text-black" onClick={firstPage}>
            {"<<"}
          </button>
          <button className=" hover:text-black" onClick={prevPage}>
            {"<"}
          </button>
          {renderPageNumbers()}
          <button className=" hover:text-black" onClick={nextPage}>
            {">"}
          </button>
          <button className=" hover:text-black" onClick={lastPage}>
            {">>"}{" "}
          </button>
        </div>
      </div>
    </>
  );
}
