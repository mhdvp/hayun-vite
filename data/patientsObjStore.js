const patients = [
    {
        name: "سید علی اکبر الزمان",
        lastName: "پرنده یزدی",
        gender: "مرد",
        birthday: { year: 1356, month: 5, day: 3 },
        nationalCode: "0321456546",
        createDate: "2025/5/5", //تاریخ و ساعت ایجاد بیمار
        updateDates: ["2025/6/5,16:32", "2025/6/5,16:32"],//آرایه تاریخ و ساعت بروزرسانی ها

        sessions: [
            {
                createDate: "2025/5/5", //تاریخ و ساعت ایجاد نشست بیمار
                updateDates: ["2025/6/5,16:32", "2025/6/5,16:32"], // آرایه تاریخ و ساعت بروزرسانی ها
                age: 25, //سن بیمار در این نشست
                referrer: "دکتر سید علی سرابی ", //ارجاع‌دهنده
                history: "وزوز گوش گهگاهی  - سرگیجه گهگاهی - درد در ناحیه گردن - سابقه سرگیجه ۵ سال قبل",

                // history, // رشته متن شرح‌حال بیمار

                note: "", //رشته متن بلند یادداشت

                // referrer: "دکتر سید علی سرابی ",
                // age: "25",
                audiogram: {
                    R: { R_AC: { 500: 25, 1000: 35, 2000: 45, 4000: 55, 8000: 60 } },
                    L: { L_AC: { 500: 20, 1000: 35, 2000: 45, 4000: 55, 8000: 60 } }
                },
                speech: { R: { MCL: 55, SAT: 25, SDS: 100 }, L: { SAT: 35, SDS: 85 } },
                tympanogram: {
                    R: { Type: "An", ECV: 2.5, SC: 1.50, MEP: -50, G: 0.23 },
                    L: { Type: "C5", SC: 0.10, MEP: -300, G: 0.32 },
                },
                reflex: {
                    R: {
                        IPSI: { 500: "85", 1000: "90", 2000: "NR", 4000: "NR" },
                        CONTRA: { 500: "85", 1000: "90", 2000: "NR" },
                    },
                    L: {
                        IPSI: { 500: "85", 1000: "90", 2000: "95", 4000: "NR" },
                        CONTRA: { 500: "80" }
                    },
                },
                report: "کاهش شنوایی ملایم در فرکاس های زیر هر دو گوش - تکرار آزمون سالانه توصیه شد.",

            },
            {
                history: "سرگیجه دورانی",
                audiogram: { R: { R_AC: { 500: 5 } }, L: { L_AC: { 500: 15 } } },

            },
            {
                audiogram: { R: { R_AC: { 500: 35 } }, L: { L_AC: { 500: 5 } } },
                speech: { R: { SAT: 25, SDS: 100 } },

            },
        ]

    },
    {
        name: "مهدی",
        lastName: "بخشی",
        birthYear: "Date",
        files: [],

    },
    {
        name: "سعید",
        lastName: "آزموده",
    },

]

export default patients;