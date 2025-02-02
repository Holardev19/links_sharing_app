import Select, { OptionProps } from "react-select";
import Image from "next/image";
import github from "@/app/assets/github.svg";
import ftm from "@/app/assets/frontendmentor.svg";
import twitter from "@/app/assets/twitter.svg";
import linkedin from "@/app/assets/linkedin.svg";
import youtube from "@/app/assets/youtube.svg";
import facebook from "@/app/assets/facebook.svg";
import twitch from "@/app/assets/twitch.svg";
import devto from "@/app/assets/devto.svg";
import codewars from "@/app/assets/codewars.svg";
import codepen from "@/app/assets/codepen.svg";
import freecodecamp from "@/app/assets/freecodecamp.svg";
import gitlab from "@/app/assets/gitlab.svg";
import hashnode from "@/app/assets/hashnode.svg";
import stackoverflow from "@/app/assets/stackoverflow.svg";
import { JSX } from "react";

type PlatformOption = {
  value: string;
  label: string;
  icon: string;
};

const platforms: PlatformOption[] = [
  { value: "Github", label: "Github", icon: github },
  { value: "Frontend Mentor", label: "Frontend Mentor", icon: ftm },
  { value: "Twitter", label: "Twitter", icon: twitter },
  { value: "LinkedIn", label: "LinkedIn", icon: linkedin },
  { value: "Youtube", label: "Youtube", icon: youtube },
  { value: "Facebook", label: "Facebook", icon: facebook },
  { value: "Twitch", label: "Twitch", icon: twitch },
  { value: "Dev.to", label: "Dev.to", icon: devto },
  { value: "Codewars", label: "Codewars", icon: codewars },
  { value: "Codepen", label: "Codepen", icon: codepen },
  { value: "freeCodeCamp", label: "freeCodeCamp", icon: freecodecamp },
  { value: "Gitlab", label: "Gitlab", icon: gitlab },
  { value: "Hashnode", label: "Hashnode", icon: hashnode },
  { value: "Stack Overflow", label: "Stack Overflow", icon: stackoverflow },
];

const PlatformSelector = ({
  onChange,
}: {
  onChange: (platform: string) => void;
}) => {
  const CustomSingleValue = ({
    data,
  }: {
    data: PlatformOption;
  }): JSX.Element => (
    <div className="flex items-center">
      <Image
        src={data.icon}
        alt={data.label}
        width={16}
        height={16}
        className="mr-2"
      />
      {data.label}
    </div>
  );

  const CustomOption = (props: OptionProps<PlatformOption>) => {
    const { data, innerRef, innerProps } = props;
    return (
      <div
        ref={innerRef}
        {...innerProps}
        className="flex cursor-pointer items-center p-2 hover:bg-gray-200"
      >
        <Image
          src={data.icon}
          alt={data.label}
          width={16}
          height={16}
          className="mr-2"
        />
        {data.label}
      </div>
    );
  };

  return (
    <Select
      options={platforms}
      onChange={(selectedOption) => {
        if (selectedOption) {
          onChange((selectedOption as PlatformOption).value);
        }
      }}
      components={{
        SingleValue: CustomSingleValue,
        Option: CustomOption,
      }}
      isSearchable
      placeholder="Select a platform"
      className="w-full outline-none"
    />
  );
};

export default PlatformSelector;
