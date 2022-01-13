import * as Yup from 'yup';

import constantsYup from '~/constants/yup';

interface LabelProps {
  label?: string;
}

const translation = {
  mixed: {
    required: ({ label }: LabelProps) =>
      label
        ? `${label} ${constantsYup.yup_mixed_required_label_field}`
        : constantsYup.yup_mixed_required_field,
  },
};

Yup.setLocale(translation);

export default Yup;
