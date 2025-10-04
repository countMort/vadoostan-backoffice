import * as Yup from "yup"

export const catDic = {
  music: {
    label: "موسیقی",
    color: "#DBB1FF",
  },
  movie: {
    label: "فیلم",
    color: "#F895A2",
  },
  science: {
    label: "علمی",
    color: "#AEFBDC",
  },
  game: {
    label: "بازی",
    color: "#FFD497",
  },
  handicraft: {
    label: "خلق",
    color: "#A1C8F6",
  },
  cooking: {
    label: "آشپزی",
    color: "#6DE69F",
  },
  talk: {
    label: "گفتگو",
    color: "#EF9CCA",
  },
  trip: {
    label: "کوله‌بار",
    color: "#9DF0F0",
  },
  performing_arts: {
    label: "هنرهای نمایشی",
    color: "#A1C8F6",
  },
  homa_and_hoom: {
    label: "هماوهوم",
    color: "#AEFBDC",
  },
  va_tan: {
    label: "و‌تن",
    color: "#EFEC9C ",
  },
  fantasy: {
    label: "فانتزی",
    color: "#A1C8F6",
  },
  nations: {
    label: "ملل",
    color: "#A1C8F6",
  },
  literature: {
    label: "ادبیات",
    color: "#A1C8F6",
  },
  language: {
    label: "زبان",
    color: "#A1C8F6",
  },
  beauty: {
    label: "زیبایی",
    color: "#EFEC9C",
  },
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
        id: "" as string,
        title: "",
        address: "",
      },
      director: {
        userId: "",
        name: "",
        bio: "",
        photoUrl: "",
      },
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
          id: Yup.string().required("محل برگزاری تجربه مورد نیاز است."),
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

// Venue form constants
export const create_venue_form_initial_values = {
  title: "",
  neighborhood: "",
  city: defaultCity,
  fullAddress: "",
  googleMap: "",
}

export const create_venue_form_validation_schema = Yup.object({
  title: Yup.string().required("نام مکان الزامی است."),
  neighborhood: Yup.string().required("محله الزامی است."),
  city: Yup.object({
    id: Yup.number().required("شهر مورد نیاز است."),
  }),
  fullAddress: Yup.string()
    .min(10, "حداقل 10 کارکتر")
    .required("آدرس کامل الزامی است."),
  googleMap: Yup.string()
    .url("لینک گوگل مپ معتبر نیست.")
    .matches(
      /https:\/\/(www\.)?(google\.com\/maps|maps\.google\.com).*\/@-?\d+\.?\d*,-?\d+\.?\d*/,
      "لینک گوگل مپ باید شامل مختصات (عرض و طول جغرافیایی) باشد."
    )
    .required("لینک گوگل مپ الزامی است."),
})

// Director form constants
export const create_director_form_initial_values = {
  firstName: "",
  lastName: "",
  mobileNumber: "",
  jobTitle: "",
  bio: "",
  image: [] as File[],
}

const common_director_form_validation_schema = {
  jobTitle: Yup.string().required("عنوان شغلی الزامی است."),
  bio: Yup.string()
    .min(10, "حداقل 10 کارکتر")
    .max(500, "تعداد کارکتر از 500 بیشتر نمی‌تواند باشد.")
    .required("بیوگرافی الزامی است."),
}
export const create_director_form_validation_schema = Yup.object({
  firstName: Yup.string().required("نام الزامی است."),
  lastName: Yup.string().required("نام خانوادگی الزامی است."),
  mobileNumber: Yup.string()
    .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست (مثال: 09123456789)")
    .required("شماره موبایل الزامی است."),
  ...common_director_form_validation_schema,
  image: Yup.array()
    .of(
      Yup.mixed().test(
        "fileSize",
        "حجم فایل بالاست (max 1 MB)",
        (file) => !file || (file as File).size <= 1 * 1024 * 1024 // 1 MB
      )
    )
    .min(1, "عکس مورد نیاز است."),
})

export const update_director_form_validation_schema = Yup.object({
  ...common_director_form_validation_schema,
  image: Yup.array().of(
    Yup.mixed().test(
      "fileSize",
      "حجم فایل بالاست (max 1 MB)",
      (file) => !file || (file as File).size <= 1 * 1024 * 1024 // 1 MB
    )
  ),
})

// Category form constants
export const create_category_form_initial_values = {
  faTitle: "",
  enTitle: "",
}

export const create_category_form_validation_schema = Yup.object({
  faTitle: Yup.string().required("عنوان فارسی الزامی است."),
  enTitle: Yup.string().required("عنوان انگلیسی الزامی است."),
})
