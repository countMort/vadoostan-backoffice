"use client"

import { useDispatch, useSelector } from "react-redux"
import Slider, { Settings } from "react-slick"
import { Button, Divider, Typography } from "@mui/material"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { baseUrl, be_time_format } from "@/constants"
import FestIcon from "@/components/Global/Icons/FestIcon"
import Image from "next/image"
import { customDate } from "@/components/Global/Form/DatePicker"
import { resetForm } from "../create.slice"
import { redirect, useRouter } from "next/navigation"
import gregorian from "react-date-object/calendars/gregorian"
import gregorian_en from "react-date-object/locales/gregorian_en"
import {
  useAddExperiencePhotosMutation,
  useCreateExperienceMutation,
  useUpdateExperienceMutation,
} from "@/api"
import { toast } from "react-toastify"
import { RootState } from "@/store"
import {
  createExpId,
  experience_create_route,
  experiences_route,
} from "@/constants/route-names"
import { getFiles, resetFiles } from "../utils"
import { use } from "react"

const slider_settings: Settings = {
  infinite: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  dots: false,
}

export default function Confirm({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id: expId } = use(params)
  const isEdit = expId !== createExpId

  const data = useSelector((state: RootState) => state.experiences.credit.form)
  const images = getFiles()
  const router = useRouter()
  const time = customDate(data.sessions[0].time, {
    locale: "fa",
  })
  const publishTime = customDate(
    data.sessions[0].publishTime.date + " " + data.sessions[0].publishTime.time,
    { locale: "fa" }
  )

  const [createExp, { isLoading: isCreating }] = useCreateExperienceMutation()
  const [updateExp, { isLoading: isUpdating }] = useUpdateExperienceMutation()
  const [upload, { isLoading: isUploading }] = useAddExperiencePhotosMutation()

  const submit = async () => {
    const body = {
      title: data.title,
      description: data.description,
      categoryId: Number(data.category.id),
      faqs: data.faqs,
      isSeries: false,
      sessions: [
        {
          time: time.convert(gregorian, gregorian_en).format(be_time_format),
          publishTime: publishTime
            .convert(gregorian, gregorian_en)
            .format(be_time_format),
          description: data.sessions[0].description,
          duration: Number(data.sessions[0].duration),
          venueId: Number(data.sessions[0].venue.id),
          price: Number(data.sessions[0].price),
          capacity: Number(data.sessions[0].capacity),
          groupLink: data.sessions[0].groupLink,
          allowedGender: "all",
          directorsUserId: [data.sessions[0].director.userId],
          assistantsUserId: [] as string[],
          inclusionItemsId: data.sessions[0].inclusions.map((inc) => inc.id),
          publishNow: data.sessions[0].publishNow,
          ...(isEdit ? { id: data.sessions[0].id } : {}),
        },
      ],
    }
    try {
      if (isEdit) {
        await updateExp({ exp: body, expId }).unwrap()
        toast("تجربه بروز شد.")
      } else {
        const newBody = { ...body, creatorUserId: "01JSVKNNAXDZNZ5NBDTSAZKWPM" }
        const result = await createExp(newBody).unwrap()
        toast("تجربه ساخته شد.")
        const formData = new FormData()
        images.forEach((img) => formData.append("files", img))
        await upload({ expId: result.result.expId, formData })
          .unwrap()
          .catch(() => {
            toast("مشکلی در آپلود عکس ها به وجود آمد.")
          })
      }
      setTimeout(() => {
        cancel()
      }, 1000)
    } catch (error: any) {
      console.log(error)
    }
  }

  const back = () => {
    router.back()
  }

  const dispatch = useDispatch()
  const cancel = () => {
    dispatch(resetForm())
    resetFiles()
    if (isEdit) router.push(experiences_route)
    else back()
  }

  if (!data.title) return redirect(experience_create_route)

  return (
    <>
      {images.length ? (
        <Slider {...slider_settings}>
          {images.map((file, idx) => (
            <Image
              key={`تصویر ${idx}`}
              src={URL.createObjectURL(file)}
              alt={`تصویر ${idx}`}
              className="object-contain"
              width={200}
              height={200}
            />
          ))}
        </Slider>
      ) : (
        <></>
      )}
      <div className="px-10">
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
      <div className="flex justify-center gap-x-1 sm:gap-x-2 py-2 mt-2">
        <Button
          variant="outlined"
          onClick={submit}
          loading={isCreating || isUploading || isUpdating}
        >
          ثبت
        </Button>
        <Button variant="outlined" onClick={back}>
          بازگشت
        </Button>
        <Button variant="outlined" onClick={cancel}>
          انصراف
        </Button>
      </div>
    </>
  )
}
