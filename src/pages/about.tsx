import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import JapanPic from "../components/JapanPic/JapanPic"

import "./about.css"

export default function about() {
  return (
    <Layout showBackground>
      <SEO
        title="About-Me"
        description="A page dedicated to all things about me including my personal life, my computer science background, my personal setup in terms of desktop setup, laptop setup, linux setup, etc"
        lang="English (EN-US)"
      />
      <div className="PageContainer" style={{ overflowX: "hidden" }}>
        <h1
          style={{
            position: "relative",
            left: "6px",
          }}
        >
          About Me
        </h1>
        <JapanPic />
        <section className="AboutContainer">
          <p className="AboutParagraph">I'm Kyle Yasuda.</p>
          <p className="AboutParagraph">
            I'm a Senior at the University of Michigan - Ann Arbor studying
            Computer Science.
          </p>
          <p className="AboutParagraph">
            It was during my sophomore year of High School where I took my first
            formal programming course, Honors C++. Since then, I've taken at
            least one, typically two, computer science courses per semester.
            That includes my Junior and Senior years of High School where I took
            AP Java and Honors Python respectively.
          </p>
          <p className="AboutParagraph">
            For my first three years at Michigan, I programmed almost
            exclusively in C/C++ and as a result, I am most comfortable with
            C++. I say almost exclusively becuase I took a course in my Junior
            year that covered many different topics in computer science
            including Bash scripting and Python.
          </p>
          <p className="AboutParagraph">
            This past summer (2020), due to the Covid-19 pandemic, I was unable
            to participate in a summer internship. As a result, I decided to
            spend the summer learning web development, and specifically
            React.js. I have always had an interest in web development, but
            lacked the time and motivation to commit myself to learning how to
            build websites. This is in part due to the fact that for three years
            at Michigan, the only programs that I wrote were C++ command line
            applications. I also knew that C++ is not a language that people
            generally create websites with (although you can do it). Because of
            those two reasons I decided to branch out, try something new, and
            experience some new software. The only question was: React, Angular,
            or Vue. After doing some initial research I quickly decided not to
            learn Angular becuase of the need to learn typescript as well. I do
            plan on learning typescript eventually for use in React
            applications, however, because I had no prior experience with HTML,
            CSS, or JavaScript, I decided hold off on learning typescript until
            after I learned JavaScript. The reason that I went with React over
            Vue was simply because React is larger and has more users than Vue.
            The advantage of this is that there are many third-party libraries,
            components, and tools that are easy to find and integrate into your
            own project. Another advantage of having a large user base is that
            any problem you come across is likely to have been seen and solved
            by someone on the internet before.
          </p>
          <p className="AboutParagraph">
            Once I made the decision to learn React, I followed a simple process
            to incrementally learn something in React, like props, hooks, or API
            calls, then creating a small react app using what I had learned. I
            feel that hands on experience building things using the concepts and
            features that a large framework like React has really helped me
            learn more than studying documentation. Eventually, I put it all
            together to create this website, which is the culmination of three
            and a half projects I worked on this summer (I will go into more
            detail about why three and a half in a future blog post). I used the
            plethora of free material available online that teach you the
            concepts and provide conrecte examples of the concepts in use, as
            well as reading through the official documentation, which is
            something that I still refrence frequently
          </p>
          <p className="AboutParagraph">
            In the Fall semester 2020, I completed a Web Systems course, in
            which I worked with Flask, Jinja2, and React to create a web-based
            Instagram clone. Since then, I learned TypeScript and began the
            process of converting this website to using TypeScript. The other
            thing that I am constantly working on is the customization of my
            Linux system (Arch Linux btw). For about two months, I have been
            daily driving ArcoLinux on my personal laptop and I am dual booting
            Windows 10 and ArcoLinux on my PC.
          </p>
        </section>
        <hr />
        <p style={{ display: "block", textAlign: "center" }}>
          Check out my Wakatime profile here
        </p>
        <div className="WakaTime">
          <a href="https://wakatime.com" rel="noreferrer" target="_blank">
            <img
              src="https://wakatime.com/share/@cb761320-ecf4-4a76-a931-6d29dae94b27/7498581f-3aec-4a41-8f59-9775cef05932.png"
              className="WakaImg"
            />
          </a>
          <a
            href="https://wakatime.com/@sudacode"
            rel="noreferrer"
            target="_blank"
          >
            <img
              src="https://wakatime.com/share/@cb761320-ecf4-4a76-a931-6d29dae94b27/87b67da8-41f0-4254-9948-052d383cd27d.png"
              className="WakaImg"
            />
          </a>
        </div>
      </div>
    </Layout>
  )
}
