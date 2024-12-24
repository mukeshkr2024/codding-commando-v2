import { metaDetails } from "data/meta-details";
import CourseDetails from "./course-detail";

export async function generateMetadata({ params }) {
  const { courseId } = await params;

  const result = metaDetails.find((course) => course.courseId === courseId);

  const title =
    result?.title || "Salesforce Training Courses | Coding Commando";
  const description =
    result?.description ||
    "Get edge with Coding Commando's Salesforce training courses.";

  return {
    title: title,
    description: description,
    alternates: {
      canonical: `https://codingcommando.in/${courseId}`,
    },
    openGraph: {
      title: title,
      description: description,
      url: `https://codingcommando.in/${courseId}`,
      siteName: "Coding Commando",
      Locale: "en_IN",
      type: "website",
      images: "https://codingcommando.in/favicon.ico",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
    },
  };
}

const CourseIdPage = async ({ params }) => {
  const { courseId } = await params;

  return (
    <>
      <CourseDetails courseId={courseId} />
    </>
  );
};

export default CourseIdPage;
