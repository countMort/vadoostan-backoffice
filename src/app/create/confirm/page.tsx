"use client";

import { RootState } from "@/store";
import { useSelector } from "react-redux";
import Slider, { Settings } from "react-slick";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { DateObject } from "react-multi-date-picker";
import { time_format } from "@/constants";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const items = ["Item 1", "Item 2", "Item 3"];

const testObj = {
  title: "تست",
  description: "این تست هست",
  categoryId: -1,
  faqs: [
    {
      question: "جدی؟",
      answer: "ها",
    },
    {
      question: "جدی جدی؟",
      answer: "هااااا",
    },
  ],
  sessions: [
    {
      time: "۲۰/۰۴/۱۴۰۴ ۲۰:۰۰:۰۰",
      description: "اینم توضیح",
      duration: "5",
      price: "1000",
      capacity: "30",
      publishTime: {
        date: "۱۴۰۴/۰۴/۲۱",
        time: "۹:۰۰",
      },
      groupLink: "https://t.me/dadash",
      venue: {
        id: 1,
        title: "",
        address: "",
      },
      directorId: "01JSVKNNAXDZNZ5NBDTSAZKWPM",
    },
  ],
};

export default function Confirm() {
  //   const data = useSelector((state: RootState) => state.createExp.form);
  const data = testObj;
  console.log(data);
  const time = new DateObject({
    format: time_format,
    date: data.sessions[0].time,
    locale: persian_fa,
    calendar: persian,
  });
  const settings: Settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <div className="mx-auto max-w-3xl mt-5 border-1 border-gray-400 rounded-sm">
      <Slider {...settings}>
        {items.map((item, idx) => (
          <Card key={idx} sx={{ m: 2 }}>
            <CardContent>
              <Typography>{item}</Typography>
            </CardContent>
          </Card>
        ))}
      </Slider>
      <div className="px-[40px]">
        <Typography>{data.title}</Typography>
        <div className="flex">
          <Typography fontSize={14}>
            {time.format("DD MMMM، ساعت HH:mm")}
          </Typography>
          <div className="rounded-full w-2.5 h-2.5 bg-amber-700 self-center mx-3.5" />
          <Typography>محله {data.sessions[0].venue.title}</Typography>
        </div>
        <Divider sx={{ mt: "25px", mb: "15px" }} />
        <Typography component="h2" sx={{ mb: "6px" }} fontSize={16}>
          توضیحات
        </Typography>
        <Typography fontSize={12}>{data.description}</Typography>
        <Divider sx={{ mt: "25px", mb: "15px" }} />
        <h2>آنچه در تجربه ارائه می‌شود</h2>
        ...
      </div>
      <div className="flex justify-center gap-x-1 sm:gap-x-2 fixed bottom-0 left-0 w-full py-2 z-50">
        <Button variant="outlined">ثبت</Button>
        <Button variant="outlined">بازگشت</Button>
        <Button variant="outlined">انصراف</Button>
      </div>
    </div>
  );
}
