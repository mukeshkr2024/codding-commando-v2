import { RegisterButton } from "app/(root)/(workshops)/workshop/salesforce/page";

export function OfferEnds({ minutes, seconds }) {
  return (
    <div className="mx-auto mt-6 flex max-w-sm flex-col items-center  gap-y-3  sm:mt-10 sm:max-w-lg md:mt-16 md:max-w-xl lg:max-w-3xl xl:max-w-5xl">
      <RegisterButton />
      <p className="text-center text-xl font-normal">Offer ends in</p>
      <div className="mt-2 flex gap-6">
        <div
          className=" flex h-20 w-20 flex-col items-center justify-center rounded-[15px] border border-[#F4F4F4]
  md:h-24 md:w-24"
        >
          <span className="text-3xl font-semibold md:text-5xl">00</span>
          <p className="text-base font-normal md:text-lg">Hours</p>
        </div>
        <div
          className=" flex h-20 w-20 flex-col items-center justify-center rounded-[15px] border border-[#F4F4F4]
  md:h-24 md:w-24"
        >
          <span className="text-3xl font-semibold md:text-5xl">{minutes}</span>
          <p className="text-base font-normal md:text-lg">Mins</p>
        </div>
        <div
          className=" flex h-20 w-20 flex-col items-center justify-center rounded-[15px] border border-[#F4F4F4]
  md:h-24 md:w-24"
        >
          <span className="text-3xl font-semibold md:text-5xl">{seconds}</span>
          <p className="text-base font-normal md:text-lg">Seconds</p>
        </div>
      </div>

      <p className=" text-center text-sm font-normal sm:text-base md:text-[21px]">
        This Webinar is for all freshers who are looking for new opportunities
        in the Salesforce and for those who want to switch their career in the
        Salesforce
      </p>
    </div>
  );
}
