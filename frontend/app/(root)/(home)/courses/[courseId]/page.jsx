import { metaDetails } from 'data/meta-details';
import CourseDetails from './course-detail'

export async function generateMetadata({params}){

  const result = metaDetails.find(course => course.courseId === params.courseId);

  const title = result?.title || "Salesforce Training Courses | Coding Commando"
  const description = result?.description || "Get edge with Coding Commando's Salesforce training courses."

  return {
    title: title,
    description:description,
    alternates: {
      canonical: `https://codingcommando.in/${params?.courseId}`,
    },
    openGraph: {
      title: title,
      description:description,
      url:`https://codingcommando.in/${params?.courseId}`,
      siteName: "Coding Commando",
      Locale: "en_IN",
      type: "website",
      images: "https://codingcommando.in/favicon.ico",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description:description,
  }
}
}

const CourseIdPage = ({params}) => {
  return (
    <>
      <CourseDetails params={params}/>
    </>
  )
} 

export default CourseIdPage
