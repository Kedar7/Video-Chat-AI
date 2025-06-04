"use client";

import Image from "next/image";
import React, { FC, MouseEvent, ReactNode } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "./ui/use-toast";
import 'bootstrap-icons/font/bootstrap-icons.css';

const dateStr = ({ date = "" }) => (
  <p className="text-base font-normal text-[#6C757D]">{date}</p>
);

const ActionBtns = ({
  handleClick = (e: MouseEvent) => {},
  buttonIcon = "",
  buttonText = "",
  link = "",
}) => {
  const { toast } = useToast();

  return (
    <div className="flex gap-2">
      <Button onClick={handleClick} className="rounded bg-blue-1 px-6 text-white">
        {buttonIcon && (
          <i className={cn("bi text-lg text-white", buttonIcon)} />
        )}
        &nbsp; {buttonText}
      </Button>
      {/* <Button
        onClick={() => {
          navigator.clipboard.writeText(link);
          toast({
            title: "Link Copied",
          });
        }}
        className="bg-dark-4 px-6"
      >
        <i className="bi bi-clipboard text-lg text-white" />
        &nbsp; Copy Link
      </Button> */}
    </div>
  );
};

const ParticipantAvatars = ({ images = avatarImages, extras = 5 }) => {
  return (
    <div className="relative flex w-full max-sm:hidden">
      {/* {images.map((img, index) => (
        <Image
          key={index}
          src={img}
          alt="attendees"
          width={40}
          height={40}
          className={cn("rounded-full", { absolute: index > 0 })}
          style={{ top: 0, left: index * 28 }}
        />
      ))} */}
      {/* <div className="flex-center absolute left-[136px] size-10 rounded-full border-[5px] border-dark-3 bg-dark-4">
        +{extras}
      </div> */}
    </div>
  );
};

export const avatarImages = [
  "/images/avatar-1.jpeg",
  "/images/avatar-2.jpeg",
  "/images/avatar-3.png",
  "/images/avatar-4.png",
  "/images/avatar-5.png",
];

type PropType = {
  icon: string;
  title: string;
  subTitle: ReactNode;
  bottomSlot: ReactNode;
  children?: ReactNode;
};

const MeetingCard = ({
  icon = "",
  title = "",
  subTitle = <></>,
  bottomSlot = <></>,
  children,
}: PropType) => {
  return (
    <section className="flex min-h-[258px] w-full flex-col justify-between rounded-[14px] bg-[#F8F9FA] px-5 py-8 xl:max-w-[568px]">
      <article className="flex flex-col gap-5">
        <i className={cn("bi text-2xl text-[#212529]", icon)} />
        <div className="flex flex-col gap-2">
          <h1 className="text-xl md:text-2xl font-bold text-[#212529] break-words">{title}</h1>
          <div className="text-sm text-gray-600">{subTitle}</div>
        </div>
      </article>
      <article className="mt-6">
        {bottomSlot}
      </article>
      {children}
    </section>
  );
};

MeetingCard.ParticipantAvatars = ParticipantAvatars;
MeetingCard.ActionBtns = ActionBtns;
MeetingCard.dateStr = dateStr;

export default MeetingCard;
