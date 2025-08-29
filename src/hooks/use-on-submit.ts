import { useStatus } from './use-status';

export function useOnSubmit<ResDataT, ResErrorT extends string>({
  payload,
  statuses,
  action,
  onSuccess,
  onError,
  onException,
  onParse,
}: {
  payload?: FormData;
  statuses?: ResErrorT[];
  action: (payload: FormData) => Promise<ActionResponse<ResDataT, ResErrorT>>;
  onSuccess?: (res: ActionSuccessResponse<ResDataT>) => void;
  onError?: (res: ActionFailureResponse<ResErrorT>) => void;
  onException?: (err: unknown) => void;
  onParse?: (payload: FormData) => ResErrorT | null;
}) {
  const [status, setStatus] = useStatus(statuses);
  const onSubmit = async e => {
    e.preventDefault();
    try {
      const p = payload || new FormData(e.currentTarget);
      if (onParse) {
        const parseResult = onParse(p);
        if (parseResult) {
          console.log(parseResult);
          setStatus(parseResult);
          return;
        }
      }

      setStatus('loading');
      const res = await action(p);
      if (res.success === false) {
        if (onError) {
          onError(res);
        }
        setStatus(res.error);
      } else {
        if (onSuccess) {
          onSuccess(res);
        }
        setStatus('success');
      }
    } catch (err) {
      if (onException) {
        onException(err);
      }
      setStatus('error');
    } finally {
      setStatus(prev => (prev === 'loading' ? 'idle' : prev));
    }
  };

  return [onSubmit, status] as const;
}
