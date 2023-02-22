import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { pages, PAGE_TYPE } from "../../data/pages";
import { motion } from "framer-motion";
import { ArrowLeft } from "phosphor-react";
import { InferGetStaticPropsType } from "next/types";
import { GetStaticProps, GetStaticPaths } from "next/types";

export async function getStaticPaths() {
  return {
    paths: Object.keys(pages).map(key => ({ params: { pageid: key } })),
    fallback: false, // can also be true or 'blocking'
  };
}

export const getStaticProps: GetStaticProps = async context => {
  const { params } = context;
  const pageid = params?.pageid;
  const page = pages[pageid as keyof typeof pages];
  return {
    props: {
      page,
    },
  };
};

const PageDetail: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ page }) => {
  useEffect(() => {
    // scroll to top on load
    if (window != undefined) window.scrollTo(0, 0);
  }, []);

  if (!page) {
    // TODO: Return 404 page
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[1.5fr,1fr] min-h-screen w-[100%]">
      <div className="p-10">
        <div className="sticky top-10">
          <motion.div
            className="flex justify-between mb-8"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              delay: 0.2,
            }}
          >
            <Link
              href="/"
              className="inline-flex items-center rounded-md border border-gray-300 bg-white pl-3 pr-4 py-2 text-sm font-medium text-gray-700 hover:text-white hover:bg-purple-600 hover:border-purple-600 focus:border-purple-200 focus:outline-0 focus:ring-2 focus:ring-purple-300 group"
            >
              <ArrowLeft size={20} className="w-5 h-5 mr-2 text-gray-300 group-hover:text-purple-200" />
              Back
            </Link>
            {/* <a
              href={page.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center px-2.5 py-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-purple-600 text-sm tracking-tight font-medium focus:outline-0 focus:ring-2 focus:ring-purple-400 group"
            >
              View Source
              <ArrowUpRightIcon className="w-4 h-4 text-gray-400 ml-2 group-hover:text-purple-400" />
            </a> */}
          </motion.div>
          <motion.h2
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              delay: 0.4,
            }}
            className="text-4xl font-bold tracking-tight"
          >
            {page.title}
          </motion.h2>
          {/* <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              delay: 0.6,
            }}
            className="mt-5 text-sm text-gray-600 space-y-2"
          >
            <p className="flex items-center">
              <CameraIcon className="w-4 h-4 mr-2 text-purple-500" />
              {page.author}
            </p>
            <p className="flex items-center">
              <MapPinIcon className="w-4 h-4 mr-2 text-purple-500" />
              {page.location}
            </p>
            <p className="flex items-center">
              <CalendarDaysIcon className="w-4 h-4 mr-2 text-purple-500" />
              {page.date}
            </p>
          </motion.div> */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              delay: 0.8,
            }}
            className="mt-5 text-md text-gray-500 space-y-5"
          >
            {page.description}
          </motion.div>
        </div>
      </div>
      <div className="overflow-hidden flex justify-center">
        <Image
          src={page.img}
          alt={page.title}
          placeholder="blur"
          blurDataURL={page.placeholder}
          width={parseInt(page.width)}
          height={parseInt(page.height)}
          style={{
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
};

export default PageDetail;
