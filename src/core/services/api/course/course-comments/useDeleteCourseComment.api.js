import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  dismissToast,
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../../../../utility/toast.utils";
import http from "../../../interceptor";

export const useDeleteCourseComment = (courseCommentId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteCourseComment", courseCommentId],
    mutationFn: async () =>
      await http
        .delete(`/Course/DeleteCourseComment`, {
          params: {
            courseCommandId: courseCommentId,
          },
        })
        .then((res) => res.data),
    onMutate: () =>
      showLoadingToast("در حال حذف نظر ...", "deleteCourseCommentLoading"),
    onSuccess: (data) => {
      dismissToast("deleteCourseCommentLoading");

      if (data.success) {
        showSuccessToast("نظر با موفقیت حذف شد !");

        queryClient.invalidateQueries({
          queryKey: ["adminCommentManagement"],
        });
      } else showErrorToast("مشکلی در حذف نظر به وجود آمد !");
    },
    onError: () => {
      dismissToast("deleteCourseCommentLoading");
      showErrorToast("مشکلی در حذف نظر به وجود آمد !");
    },
  });
};
