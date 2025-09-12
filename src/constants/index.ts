import * as Yup from "yup"

export const hostName = "vasando.ir"
export const baseUrl = "https://" + hostName

export const catDic = {
  music: "موسیقی",
  movie: "فیلم",
}

export const defaultCity = {
  title: "تهران",
  id: 1,
}

export const create_exp_form_initial_values = {
  title: "",
  description: "",
  faqs: [
    {
      // id: undefined as number | undefined,
      question: "",
      answer: "",
    },
  ],
  category: { id: "", title: "" } as {
    id: number | ""
    title: string
  },
  city: defaultCity,
  sessions: [
    {
      id: "",
      time: "",
      description: "",
      duration: 0,
      price: 0,
      capacity: 0,
      publishNow: false,
      publishTime: {
        date: "",
        time: "",
      },
      groupLink: "",
      venue: {
        id: "" as number | "",
        title: "",
        address: "",
      },
      director: {
        userId: "",
        name: "",
        bio: "",
        photoUrl: "",
      },
      inclusions: [] as {
        id: number
        title: string
      }[],
    },
  ],
  images: [] as File[],
  expPhotos: [] as { id: number; url: string }[],
}

export const create_exp_form_validation_schema = Yup.object({
  title: Yup.string().required("تیتر الزامی است."),
  // email: Yup.string().email("Invalid email").required("Email is required"),
  description: Yup.string()
    .min(10, "حداقل 10 کارکتر")
    .max(400, "تعداد کارکتر از 400 بیشتر نمی‌تواند باشد.")
    .required("توضیحات الزامی است."),
  category: Yup.object({
    id: Yup.number().required("دسته بندی قبیله مورد نیاز است."),
  }),
  city: Yup.object({
    id: Yup.number().required("شهر مورد نیاز است."),
  }),
  faqs: Yup.array()
    .of(
      Yup.object({
        question: Yup.string().required("سوال نمی‌تواند خالی باشد."),
        answer: Yup.string().required("پاسخ نمی‌تواند خالی باشد."),
      })
    )
    .min(1, "حداقل یک پرسش پرتکرار مورد نیاز است."),
  sessions: Yup.array()
    .of(
      Yup.object({
        groupLink: Yup.string()
          .url("لینک معتبر نیست.")
          .required("لینک گروه مورد نیاز است."),
        duration: Yup.string().required("مدت زمان تجربه الزامی است."),
        time: Yup.string().required("تاریخ برگزاری مورد نیاز است."),
        venue: Yup.object({
          id: Yup.number().required("محل برگزاری تجربه مورد نیاز است."),
        }).required("محل برگزاری تجربه مورد نیاز است."),
        price: Yup.number()
          .required("هزینه جلسه مورد نیاز است.")
          .not([0], "هزینه جلسه مورد نیاز است."),
        capacity: Yup.number()
          .required("ظرفیت جلسه مورد نیاز است.")
          .not([0], "هزینه جلسه مورد نیاز است."),
        director: Yup.object({
          userId: Yup.string().required("تجربه‌گردان مورد نیاز است."),
        }),
      })
    )
    .min(1, "حداقل یک جلسه باید تعریف شود."),
  images: Yup.array().of(
    Yup.mixed().test(
      "fileSize",
      "حجم فایل بالاست (max 1 MB)",
      (file) => !file || (file as File).size <= 1 * 1024 * 1024 // 1 MB
    )
  ),
  // .min(1, "At least one file required"),
})

export const time_format = "YYYY/MM/DD HH:mm:ss"
export const be_time_format = "YYYY-MM-DDTHH:mm:ss.000Z"
