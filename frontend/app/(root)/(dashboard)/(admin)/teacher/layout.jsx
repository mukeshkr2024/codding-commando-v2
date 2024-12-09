import { Sidebar } from "@/components/dashboard/sidebar/sidebar";
import { TeacherProtectedLayout } from "@/components/dashboard/teacher/teacher-proctect";
import { Navbar } from "@/components/dashboard/sidebar/navbar";

const TeacherLayout = ({ children }) => {
  return (
    <>
      <div className="fixed inset-y-0 z-50 h-[80px] w-full md:pl-56">
        <Navbar />
      </div>
      <div className="fixed inset-y-0 z-50 hidden h-full w-56 flex-col md:flex">
        <Sidebar />
      </div>
      <main className="h-full pt-[80px] md:pl-56">
        <TeacherProtectedLayout>{children}</TeacherProtectedLayout>
      </main>
    </>
  );
};

export default TeacherLayout;
