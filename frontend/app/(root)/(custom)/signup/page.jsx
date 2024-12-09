import { SignUpForm } from "@/components/login/sign-up-form";

const SignUpPage = () => {
  return (
    <section className="relative h-[700px] w-full bg-dark-purple text-white">
      <div className="flex h-full w-full flex-col lg:flex-row">
        <div
          className="order-2 h-1/2 w-full bg-contain bg-center bg-no-repeat lg:order-1 lg:h-full lg:w-2/3 lg:bg-bottom"
          style={{
            backgroundImage: 'url("/assets/images/background/signup-bg.png")',
          }}
        />
        <SignUpForm />
        <div
          className="order-1 h-1/2 w-full bg-contain bg-center bg-no-repeat lg:order-2 lg:h-full lg:w-1/3 lg:bg-bottom"
          style={{
            backgroundImage: 'url("/assets/images/grid.png")',
            backgroundPosition: "bottom",
          }}
        />
      </div>
    </section>
  );
};

export default SignUpPage;
