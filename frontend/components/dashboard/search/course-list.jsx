// "use client";

// import apiClient from "lib/api-client";
// import React, { useEffect, useState } from "react";
// import { CourseCard } from "./cours-card";
// // import { ErrorToast } from "@/components/error-toast";
// import LoadingAnimation from "@/components/shared/loading-animation";

// export const CourseList = () => {
//   const [courses, setCourses] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const isAlreadyEnrolled = (courseId) => {
//     return userSession?.enrolledCourses.some(
//       (course) => course?.courseId === courseId
//     );
//   };

//   async function getAllCourses() {
//     try {
//       const { data } = await apiClient.get("/get-all/courses");
//       setCourses(data?.courses);
//     } catch (error) {
//       // ErrorToast(error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     getAllCourses();
//   }, []);

//   if (loading) {
//     return <LoadingAnimation />;
//   }

//   return (
//     <div className="mt-4">
//       <div className="grid gap-y-6  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:px-8 ">
//         {courses?.map((course) => (
//           <CourseCard
//             courseId={course?._id}
//             description={course?.description}
//             title={course?.title}
//             duration={course?.duration}
//             imageUrl={course?.imageUrl}
//             profilePicture={course?.profilePicture}
//             enrolled={isAlreadyEnrolled(course?._id)}
//             key={course?._id}
//           />
//         ))}
//       </div>
//       {courses?.length === 0 && (
//         <div className="mt-10 text-center text-sm text-muted-foreground">
//           No courses found
//         </div>
//       )}
//     </div>
//   );
// };
