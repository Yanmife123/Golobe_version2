import { SectionHeader } from "../header/header";

// const reviews = [
//   {
//     id: 1,
//     name: "Olga",
//     title: "A real sense of community, nurtured",
//     work: "Weave Studios – Kai Tak",
//     src: "/reviews-img1.jpg",
//   },

//   {
//     id: 2,
//     name: "Thomas",
//     title: "“The facilities are superb. Clean, slick, bright.”",
//     work: "Weave Studios – Olympic",
//     src: "/reviews-img2.jpg",
//   },
//   {
//     id: 1,
//     name: "Eliot",
//     title: "“A real sense of community, nurtured”",
//     work: "Weave Studios – Kai Tak",
//     src: "/reviews-img3.jpg",
//   },
// ];

export function Review() {
  return (
    <section className="mt-6 border-1 border-red-400 h-[300px] md:py-12 py-6">
      <SectionHeader
        title={["Reviews", "What people says about Golobe facilities"]}
        btn={["/reviews", "See All"]}
      />
    </section>
  );
}
