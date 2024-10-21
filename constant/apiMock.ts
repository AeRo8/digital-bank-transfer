import { ApiMockState } from "~/provider/ApiMockProvider";

export const mockApiMessage: Record<ApiMockState["state"], string> = {
  "insufficient funds": "Insufficient funds",
  "network issues": "Network issues",
  "success": "Success",
};
