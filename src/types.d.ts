declare type TODO = any;
declare type ActionSuccessResponse<DataT> = { success: true; data?: DataT };
declare type ActionFailureResponse<ErrorT extends string> = { success: false; error: ErrorT };
declare type ActionResponse<DataT, ErrorT extends string> =
  | ActionSuccessResponse<DataT>
  | ActionFailureResponse<ErrorT>;
