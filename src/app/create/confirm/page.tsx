"use client";

import { useDispatch, useSelector } from "react-redux";
import Slider, { Settings } from "react-slick";
import { Button, Card, CardContent, Divider, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { baseUrl } from "@/constants";
import FestIcon from "@/components/Global/Icons/FestIcon";
import Image from "next/image";
import { customDate } from "@/components/Global/Form/DatePicker";
import { resetForm } from "../create.slice";
import { redirect, useRouter } from "next/navigation";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import { useCreateExperienceMutation } from "@/api";
import { toast } from "react-toastify";
import { RootState } from "@/store";

const items = ["تصویر 1", "تصویر 2", "تصویر 3"];

export default function Confirm() {
  const data = useSelector((state: RootState) => state.createExp.form);
  const router = useRouter();
  const time = customDate(data.sessions[0].time);
  const publishTime = customDate(
    data.sessions[0].publishTime.date + " " + data.sessions[0].publishTime.time
  );
  const settings: Settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const [createXP, { isLoading }] = useCreateExperienceMutation();

  const submit = async () => {
    const body = {
      title: data.title,
      description: data.description,
      categoryId: data.category.id,
      faqs: data.faqs,
      isSeries: false,
      creatorUserId: "01JSVKNNAXDZNZ5NBDTSAZKWPM",
      sessions: [
        {
          time: time
            .convert(gregorian, gregorian_en)
            .format("YYYY-MM-DD hh:mm:ss"),
          publishTime: publishTime
            .convert(gregorian, gregorian_en)
            .format("YYYY-MM-DD hh:mm:ss"),
          description: data.sessions[0].description,
          duration: Number(data.sessions[0].duration),
          venueId: data.sessions[0].venue.id,
          price: Number(data.sessions[0].price),
          capacity: Number(data.sessions[0].capacity),
          groupLink: data.sessions[0].groupLink,
          allowedGender: "all",
          directorsUserId: [data.sessions[0].director.userId],
          assistantsUserId: [] as string[],
        },
      ],
    };
    try {
      const result = await createXP(body).unwrap();
      toast(result.message);
      setTimeout(() => {
        cancel();
      }, 1000);
    } catch (error: any) {
      console.log(error);
    }
  };

  const back = () => {
    router.back();
  };

  const dispatch = useDispatch();
  const cancel = () => {
    dispatch(resetForm());
    back();
  };

  if (!data.title) return redirect("/create");

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
        {Boolean(data.sessions[0].inclusions?.length) && (
          <>
            <Typography component="h2">آنچه در تجربه ارائه می‌شود</Typography>
            <div className="flex flex-wrap justify-around mt-2.5">
              {data.sessions[0].inclusions.map((inc) => (
                <div
                  className="w-20 h-20 bg-gray-400 rounded-lg flex justify-center items-center flex-col dark:bg-gray-800 text-center"
                  key={`inc-${inc.id}`}
                >
                  <FestIcon className=" dark:fill-white mb-1.5" />
                  <Typography fontSize={14}>{inc.title}</Typography>
                </div>
              ))}
            </div>
            <Divider sx={{ mt: "15px", mb: "15px" }} />
          </>
        )}
        <Typography component="h2" fontSize={16}>
          سوالات متداول
        </Typography>
        <div>
          {data.faqs.map((faq, index) => (
            <div key={`faq-${index}`} className="my-3">
              <Typography component={"h3"} fontSize={12} fontWeight={"bold"}>
                {faq.question}
              </Typography>
              <Typography fontSize={12} sx={{ mt: "2px" }}>
                {faq.answer}
              </Typography>
            </div>
          ))}
        </div>
        <Divider sx={{ marginY: "14px" }} />
        <div className="flex items-center mb-2.5">
          {data.sessions[0].director.photoUrl && (
            <Image
              className="object-cover rounded-full w-[55px] h-[55px]"
              src={baseUrl + data.sessions[0].director.photoUrl}
              alt=""
              width={55}
              height={55}
            />
          )}
          <div className="mr-3.5">
            <Typography fontSize={16} fontWeight={"bold"}>
              {data.sessions[0].director.name}
            </Typography>
            <Typography fontSize={12} color="#6F6F6F">
              برگزار کننده
            </Typography>
          </div>
        </div>
        <Typography fontSize={12}>{data.sessions[0].director.bio}</Typography>
      </div>
      <div className="flex justify-center gap-x-1 sm:gap-x-2 fixed bottom-0 left-0 w-full py-2 z-50">
        <Button variant="outlined" onClick={submit} loading={isLoading}>
          ثبت
        </Button>
        <Button variant="outlined" onClick={back}>
          بازگشت
        </Button>
        <Button variant="outlined" onClick={cancel}>
          انصراف
        </Button>
      </div>
    </div>
  );
}
