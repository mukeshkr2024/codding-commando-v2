import { DemoForm } from "@/components/shared/form/demo-form";

const DemoPage = () => {
  const backgroundStyles = {
    backgroundImage: "url(/unlocking.png)",
    backgroundPosition: "bottom",
    objectFit: "cover",
  };

  const gridStyles = {
    backgroundImage: 'url("/assets/images/grid.png")',
  };

  return (
    <div
      className="relative max-h-[700px] w-full bg-dark-purple bg-center bg-no-repeat px-4 pb-16 pt-8"
      style={backgroundStyles}
    >
      <div
        className="absolute right-0 h-full w-1/2 bg-contain"
        style={gridStyles}
      />
      <DemoForm />
    </div>
  );
};

export default DemoPage;
