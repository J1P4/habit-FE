import localFont from 'next/font/local'

export const HabitFont = localFont({
    src:[
        {
            path: "./SpoqaHanSansNeo-Bold.otf",
            weight: '900',
            style: 'normal'
        },
        {
            path: "./SpoqaHanSansNeo-Medium.otf",
            weight: '500',
            style: 'normal'
        },
        {
            path: "./SpoqaHanSansNeo-Regular.otf",
            weight: '400',
            style: 'normal'
        },
        {
            path: "./SpoqaHanSansNeo-Light.otf",
            weight: '300',
            style: 'normal'
        },

    ]
})