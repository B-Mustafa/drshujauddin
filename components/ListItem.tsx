"use client"
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import getFormattedDate from '@/lib/getFormattedDate';

type Props = {
  posts: posts;
};

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
    },
  }),
};

export default function ListItem({ posts }: Props) {
  const { id, title, date, author } = posts;
  const FormattedDate = getFormattedDate(date);

  return (
    <motion.div
      className=" bg-dark-background text-dark-text  p-7 shadow-md rounded mb-8 "
      variants={fadeInAnimationVariants}
      initial="initial"
      whileInView="animate"
      viewport={{
        once: false,
      }}
    >
        <li className=' md:w-full'>

      <Link href={`/blog/${id}`} className="text-2xl font-bold mb-4 block hover:underline">
         {title}
      </Link>
      <p className="text-dark-text ">Author: <span className='font-semibold text-dark-text'>{author}</span></p>
      <p className=" text-dark-text text-xs">{FormattedDate}</p>
        </li>
    </motion.div>
  );
}
