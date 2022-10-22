export const Banner = () => {
  return (
    <div className="w-full flex flex-row font-SG text-lg space-x-2 h-fit justify-between py-16">
      <div className="w-[40%] flex flex-col justify-around items-start">
        <h1 className="font-bold mobile:text-sm tablet:text-lg laptop:text-[40px] laptop:leading-[50px] pr-10">
          Predict whether a sneaker, collab or drop will go up or down in price.
        </h1>
        <span className="mobile:text-sm tablet:text-lg laptop:text-[25px] font-normal font-Inter">
          {" "}
          Guess right and win prizes!
        </span>
        <button className="text-black outline px-5 py-3 mobile:text-sm tablet:text-lg laptop:text-[20px]">
          Play Now!
        </button>
      </div>

      <a
        className="flex flex-col h-full w-[70%] items-right"
        target="blank"
        href="https://hypebeast.com/2022/10/hublot-cooks-damascus-steel-big-bang-unico-gourmet-chef"
      >
        <img
          className="rounded-lg w-full mobile:h-[250px] tablet:h-[450px]"
          src="freeplay.svg"
        />
      </a>
    </div>
  );
};
