
import Navbar from "../components/landing/Navbar";
import { Link } from "react-router-dom";

import {
  ArrowRight,
  BookOpen,
  Monitor,
  FileText,
  Download,
  Users,
  Award,
  Laptop,
  ClipboardList,
  ShieldCheck,
  GraduationCap,
  CheckCircle,
  PlayCircle,
  Mail,
  Phone,
  MapPin,
  Headphones,
  LaptopMinimal,
  Target,
  Clock,
} from "lucide-react";

// Course information
const courses = [
  {
    title: "Computer Packages",
    description:
      "Learn essential computer applications and develop practical digital skills.",
    icon: Monitor,
    level: "Beginner",
    color: "bg-blue-100 text-blue-600",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=85",
  },
  {
    title: "Microsoft Word",
    description:
      "Learn document creation, formatting, editing and professional document design.",
    icon: FileText,
    level: "Beginner",
    color: "bg-indigo-100 text-indigo-600",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=85",
  },
  {
    title: "Microsoft Excel",
    description:
      "Develop spreadsheet skills, formulas, functions and data management.",
    icon: ClipboardList,
    level: "Beginner",
    color: "bg-emerald-100 text-emerald-600",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=85",
  },
  {
    title: "Microsoft PowerPoint",
    description:
      "Create professional presentations using slides, graphics and animations.",
    icon: Laptop,
    level: "Beginner",
    color: "bg-orange-100 text-orange-600",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=85",
  },
  {
    title: "Introduction to IT",
    description:
      "Understand computers, hardware, software, networks and information technology.",
    icon: BookOpen,
    level: "Foundation",
    color: "bg-purple-100 text-purple-600",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=85",
  },
  {
    title: "Internet and Email",
    description:
      "Learn internet browsing, online communication, email and digital safety.",
    icon: ShieldCheck,
    level: "Beginner",
    color: "bg-pink-100 text-pink-600",
    image:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&q=85",
  },
];

// Portal features
const features = [
  {
    icon: BookOpen,
    title: "Organized Learning",
    description:
      "Access your subjects, lessons and educational resources in one place.",
  },
  {
    icon: Download,
    title: "Offline Learning",
    description:
      "Download learning materials and study even without an internet connection.",
  },
  {
    icon: ClipboardList,
    title: "Assignments",
    description:
      "Access assignments, follow instructions and submit your coursework.",
  },
  {
    icon: Award,
    title: "Track Progress",
    description:
      "Monitor your learning activities and follow your progress.",
  },
];

const benefits = [
  {
    icon: GraduationCap,
    title: "Expert-Led Courses",
    description: "Structured computer literacy learning",
  },
  {
    icon: LaptopMinimal,
    title: "Practical Assignments",
    description: "Develop real computer skills",
  },
  {
    icon: Award,
    title: "Learning Progress",
    description: "Monitor your learning journey",
  },
  {
    icon: Headphones,
    title: "Flexible Learning",
    description: "Access learning resources anytime",
  },
];

const learningCards = [
  {
    title: "Learn Essential Skills",
    description: "Build a strong foundation in computer literacy.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=85",
    icon: BookOpen,
  },
  {
    title: "Practise Hands-On",
    description: "Improve your knowledge through practical exercises.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&q=85",
    icon: Laptop,
  },
  {
    title: "Achieve Your Goals",
    description: "Develop skills that support your education and career.",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&q=85",
    icon: Target,
  },
];

const steps = [
  {
    number: "01",
    title: "Create an Account",
    description: "Register as a student to access your learning portal.",
  },
  {
    number: "02",
    title: "Explore Subjects",
    description: "Discover computer literacy subjects and lessons.",
  },
  {
    number: "03",
    title: "Learn and Practise",
    description: "Study notes, complete assignments and develop your skills.",
  },
  {
    number: "04",
    title: "Track Your Progress",
    description: "Monitor your learning journey through your dashboard.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-white text-slate-900">
      <Navbar />

      {/* HERO SECTION */}
      <section
        id="home"
        className="relative isolate flex min-h-[570px] items-center overflow-hidden bg-slate-950"
      >
        {/* Hero background photograph */}
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1800&q=90')",
          }}
        />

        {/* Dark overlay for text visibility */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-950 via-blue-950/90 to-blue-950/20" />

        <div className="mx-auto w-full max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
          <div className="max-w-2xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-300/30 bg-blue-500/20 px-4 py-2 text-sm font-semibold text-blue-100">
              <GraduationCap size={18} />
              Learn. Practise. Grow.
            </div>

            <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
              Build Your Computer Skills
              <span className="block text-blue-400">
                for a Brighter Future
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-blue-50/90 sm:text-lg">
              Access quality computer literacy courses, learning materials
              and assignments. Develop practical digital skills and learn
              at your own pace.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-4 font-bold text-white shadow-lg transition hover:-translate-y-1 hover:bg-blue-500"
              >
                <PlayCircle size={20} />
                Start Learning
                <ArrowRight size={18} />
              </Link>

              <a
                href="#courses"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/70 px-7 py-4 font-bold text-white transition hover:bg-white hover:text-blue-950"
              >
                Explore Courses
              </a>
            </div>

            <div className="mt-9 flex flex-wrap gap-6 text-sm text-blue-100">
              <span className="flex items-center gap-2">
                <CheckCircle size={17} className="text-emerald-400" />
                Practical learning
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle size={17} className="text-emerald-400" />
                Downloadable notes
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS STRIP */}
      <section className="border-b border-slate-100 bg-blue-50/70 px-5 py-8 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-7 lg:grid-cols-4">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="flex items-center gap-3"
              >
                <div className="shrink-0 rounded-xl bg-white p-3 text-blue-600 shadow-sm">
                  <Icon size={27} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 sm:text-base">
                    {benefit.title}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ABOUT / MISSION SECTION */}
      <section
        id="about"
        className="scroll-mt-24 px-5 py-20 lg:px-8 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-12">

            {/* Mission text */}
            <div className="lg:col-span-4">
              <div className="mb-5 flex items-center gap-2">
                <span className="h-1 w-10 rounded-full bg-blue-600" />
                <span className="text-sm font-bold text-blue-600">
                  OUR MISSION
                </span>
              </div>

              <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">
                Empowering Students with
                <span className="text-blue-600"> Digital Skills</span>
              </h2>

              <p className="mt-6 leading-8 text-slate-600">
                We aim to make computer literacy education accessible to
                students by providing organized learning resources,
                practical exercises and digital skills development.
              </p>

              <p className="mt-4 leading-8 text-slate-600">
                Our goal is to help students become confident users of
                technology and prepare for opportunities in education
                and future careers.
              </p>

              <Link
                to="/register"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700"
              >
                Learn More
                <ArrowRight size={18} />
              </Link>
            </div>

            {/* Learning photography cards */}
            <div className="grid gap-5 sm:grid-cols-3 lg:col-span-8">
              {learningCards.map((card) => {
                const Icon = card.icon;

                return (
                  <article
                    key={card.title}
                    className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={card.image}
                        alt={card.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-transparent" />

                      <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 text-white">
                        <div className="rounded-lg bg-blue-600 p-2">
                          <Icon size={21} />
                        </div>

                        <h3 className="text-sm font-bold sm:text-base">
                          {card.title}
                        </h3>
                      </div>
                    </div>

                    <div className="p-4">
                      <p className="text-sm leading-6 text-slate-600">
                        {card.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* COURSES SECTION */}
      <section
        id="courses"
        className="scroll-mt-24 bg-slate-50 px-5 py-20 lg:px-8 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Explore Our Courses
            </span>

            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
              Popular Learning Areas
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Explore essential computer skills and start building your
              digital knowledge today.
            </p>
          </div>

          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => {
              const Icon = course.icon;

              return (
                <article
                  key={course.title}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />

                    <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-blue-700 shadow">
                      {course.level}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3">
                      <div className={`rounded-xl p-3 ${course.color}`}>
                        <Icon size={23} />
                      </div>

                      <h3 className="text-lg font-bold">
                        {course.title}
                      </h3>
                    </div>

                    <p className="mt-4 text-sm leading-7 text-slate-600">
                      {course.description}
                    </p>

                    <Link
                      to="/register"
                      className="mt-5 inline-flex items-center gap-2 border-t border-slate-100 pt-4 text-sm font-bold text-blue-600 hover:text-blue-800"
                    >
                      Start Learning
                      <ArrowRight size={17} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section
        id="features"
        className="scroll-mt-24 px-5 py-20 lg:px-8 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Why Choose Our Portal?
            </span>

            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
              Everything You Need to Learn
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              A convenient digital learning environment designed to
              support your computer literacy journey.
            </p>
          </div>

          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-slate-100 bg-white p-7 text-center transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    <Icon size={30} />
                  </div>

                  <h3 className="mt-5 font-bold">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-slate-950 px-5 py-20 text-white lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-blue-400">
              Getting Started
            </span>

            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
              Start Learning in Four Simple Steps
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              Your journey towards better digital skills begins here.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-7 transition hover:border-blue-500"
              >
                <span className="text-4xl font-extrabold text-blue-500">
                  {step.number}
                </span>

                <h3 className="mt-6 text-lg font-bold">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-r from-blue-800 to-blue-600 px-6 py-16 text-center text-white shadow-xl sm:px-12">
          <GraduationCap className="mx-auto mb-6" size={52} />

          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Your Digital Future Starts Here
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-blue-100">
            Join our learning community and take the next step towards
            developing practical computer skills.
          </p>

          <Link
            to="/register"
            className="mt-9 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-bold text-blue-700 transition hover:-translate-y-1 hover:bg-blue-50"
          >
            Create Your Student Account
            <ArrowRight size={19} />
          </Link>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section
        id="contact"
        className="scroll-mt-24 bg-slate-50 px-5 py-20 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Contact Us
            </span>

            <h2 className="mt-4 text-3xl font-extrabold">
              Get in Touch
            </h2>

            <p className="mt-4 text-slate-600">
              Have questions about our learning portal? Contact your
              learning administrator.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-7 text-center shadow-sm">
              <Mail className="mx-auto text-blue-600" size={30} />
              <h3 className="mt-4 font-bold">Email Support</h3>
              <p className="mt-2 text-sm text-slate-500">
                Contact your learning administrator.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-7 text-center shadow-sm">
              <Phone className="mx-auto text-blue-600" size={30} />
              <h3 className="mt-4 font-bold">Phone Support</h3>
              <p className="mt-2 text-sm text-slate-500">
                Speak to your learning administrator.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-7 text-center shadow-sm">
              <MapPin className="mx-auto text-blue-600" size={30} />
              <h3 className="mt-4 font-bold">Our Institution</h3>
              <p className="mt-2 text-sm text-slate-500">
                Contact your learning institution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 px-5 py-12 text-white lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 border-b border-slate-800 pb-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-600 p-3">
                <GraduationCap size={27} />
              </div>

              <div>
                <h3 className="font-extrabold">
                  Computer Literacy
                </h3>
                <p className="text-xs text-slate-400">
                  Learning Portal
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
              Empowering students with practical computer knowledge
              and digital skills for a brighter future.
            </p>
          </div>

          <div>
            <h3 className="font-bold">Quick Links</h3>

            <div className="mt-5 flex flex-col gap-3 text-sm text-slate-400">
              <a href="#home" className="hover:text-blue-400">Home</a>
              <a href="#about" className="hover:text-blue-400">About</a>
              <a href="#courses" className="hover:text-blue-400">Courses</a>
              <a href="#features" className="hover:text-blue-400">Features</a>
              <a href="#contact" className="hover:text-blue-400">Contact</a>
            </div>
          </div>

          <div>
            <h3 className="font-bold">Student Access</h3>

            <div className="mt-5 flex flex-col gap-3 text-sm text-slate-400">
              <Link to="/login" className="hover:text-blue-400">
                Student Login
              </Link>

              <Link to="/register" className="hover:text-blue-400">
                Student Registration
              </Link>
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-slate-400">
              <Clock size={16} className="text-blue-400" />
              Learn at your own pace
            </div>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 pt-7 text-center text-xs text-slate-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Computer Literacy Learning Portal.
            All rights reserved.
          </p>

          <p>Learn. Practise. Grow.</p>
        </div>
      </footer>
    </div>
  );
}
