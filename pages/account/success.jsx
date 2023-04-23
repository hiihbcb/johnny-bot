import { useEffect } from "react";

export default function Success() {
useEffect(() => {
    window.opener.location.reload();
    window.close();
  })
}
