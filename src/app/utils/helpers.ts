export function getInitials(name: string | undefined): string {
  if (!name) return '';

  const nameParts = name.split(' ');
  let firstNameInitial = '';
  let lastNameInitial = '';

  if (nameParts.length > 0) {
    firstNameInitial = nameParts[0]?.charAt(0) || '';
    if (nameParts.length > 1) {
      lastNameInitial = nameParts[1]?.charAt(0) || '';
    }
  } else {
    firstNameInitial = name.charAt(0) || '';
  }

  return `${firstNameInitial}${lastNameInitial}`.toUpperCase();
}
