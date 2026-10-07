import { FORMSUBMIT_EMAIL } from '../config/formConfig';

/** Single destination for every inquiry form — change once to reroute. */
export { FORMSUBMIT_EMAIL };

export interface QuotePrefill {
  service?: string;
  vehicle?: string;
  destination?: string;
  details?: string;
}

/** POST a contact/quote inquiry to FormSubmit (AJAX). Throws on failure. */
export async function submitInquiry(
  fields: Record<string, string>,
  subject: string
): Promise<void> {
  const res = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_EMAIL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({
      ...fields,
      _subject: subject,
      _template: 'table',
      _captcha: 'false',
    }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.message || 'Submit failed');
  }
}
