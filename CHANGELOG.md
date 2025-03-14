## [2.3.1] - 14-03-2025

### Changed

- Added unique id's to ToggleProvider triggers, and made the logic for closing its target when clicking outside of it,
  not run, if clicking on any of its own triggers. This should fix a problem where attempting to close the target by clicking on
  a trigger outside of it, would instantly re-open it.

## [2.3.0] - 13-03-2025

### Changed

- Revised the front page text content.
- Added functionality into the ToggleProvider to optionally close its target if clicking outside of it.
- Upated the bet-management screen to show all bets a user has created, separated by if they are expired or not.
- Added ability to click on unexpired bets, taking the user to the betting screen for that bet.
- Added a button to copy the link to a bet, so it can be shared.

### Added

- A Donation link to the front page.
- A cookie notice.

## [2.2.0] - 13-03-2025

### Added

- A verification email is now sent to the user's email when they register.
- Password reset functionality.
- Rate limiting.

### Changed

- Made the font semibold on buttons.
- Users can now navigate between their dashboard, creating bets, and the bet list through the footer.

## [2.1.0] - 09-03-2025

### Changed

- Refactored the front page.
- Updated the app icon.

## [2.0.1] - 09-03-2025

### Fixed

- Incorrect date on the previous update from 08-03-, to 09-03-2025.
- The main menu animation not playing.

## [2.0.0] - 09-03-2025

### Added

- Functionality to constrain the number of users who can register.
- Back-end support for multiple currencies.

### Changed

- Refactored middleware.
- Refactored useList. Now takes an object as its argument. Also added an onEmpty-prop to it.
- Updated the method of displaying the main menu.
- The color of input borders to a darker slate-color.

### Fixed

- An oversight in the endBetAction, where the creator share was given to the current session user. This is was technically
  correct, as only the creator can end the bet anyway, but updated it so the reward goes to the user with the id defined
  in the bet's author_id-column.

## [1.2.1] - 08-03-2025

### Fixed

- The selected outcome on a bid not being displayed correctly.
- Two bets being created at once, due to the service worker, by disabling the service worker for now.
- Empty outcomes being allowed when creating a bet.

## [1.2.0] - 07-03-2025

### Added

- Ability to delete accounts.

### Changed

- Registration- and Login errors are now displayed underneath the inputs, instead of toasts, excluding unexpected errors.
- Placed bids are now not deleted if the user who placed it, deletes their account.

## [1.1.4] - 06-03-2025

### Added

- App PWA icon.

### Changed

- Changed the app name.
- Changed the width of the CTA-button on large screens, on the index page.

## [1.1.3] - 06-03-2025

### Fixed

- Another bug in the closing of bets, with division by zero, when there are no winners.

## [1.1.1] - 06-03-2025

### Fixed

- A bug in the urls, in the middleware redirections.

## [1.1.0] - 06-03-2025

### Changed

- useRecord now set empty date values to undefined.
- Bets pagination.

### Fixed

- The behaviour of the back button sometimes returning to the bet creation screen, when it was not supposed to.
- An error with the pool being a string, instead of a number, when closing a bet.

### Added

- Constraint on the bet dates, to disallow expiry on the same day they are created.

## [1.0.1] - 06-03-2025

### Changed

- Switched to using the default server instead of the custom one.
- Added the router as part of the callback deps in the login form's onSubmit.

### Fixed

- Zod validation being outside of the try-catch block in the register form onSubmit, causing obscure errors if one occured.
- The registration onSubmit not updating when the credentials are changed.

### Removed

- Console.log statement in the useEffect, inside the useRecord-hook, when the value changes.

## [1.0.0] - 05-03-2025

### Release

Version 1.0.0 is released, containing the bare-minimum features of the app:

- User registration and login
- Bet creation
- Bid placement
- Bet closure
