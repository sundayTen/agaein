const useMobile = () => {
    const mobileRegex = [
        /Android/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i,
      ];
      
      return mobileRegex.some((mobile) => navigator.userAgent.match(mobile))
}

export default useMobile