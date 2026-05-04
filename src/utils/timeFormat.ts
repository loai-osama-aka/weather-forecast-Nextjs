export function FormatTime(time:string | undefined): string | undefined {
    const formated=time?.slice(0,5) ;
    return formated;
}