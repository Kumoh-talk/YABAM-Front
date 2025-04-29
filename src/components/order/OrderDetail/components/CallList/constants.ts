import { Call } from "@/types";

export const dummyCalls: Call[] = [
  {
    id: 1,
    message: '한국말로 물 뭐야',
    calledAt: new Date().toISOString(),
    isEnded: false,
  },
  {
    id: 2,
    message: '물은 셀프야',
    calledAt: new Date().toISOString(),
    isEnded: false,
  },
]