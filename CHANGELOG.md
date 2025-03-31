## [4.0.3] - 28-03-2025

### Unreleased

- Addition of a terms_accepted_on columns to users.
- Requesting of permission to display push notifications to the client.

### Changed

- The appearance of the header while viewing a bet.
- The appearance of the front page.

## [4.0.2] - 28-03-2025

### Unreleased

- Addition of a terms_accepted_on columns to users.
- Requesting of permission to display push notifications to the client.

### Fixed

- A bug in the ending of bets, where winners did not get their share, even though the test for it seemed to pass.

### Changed

- The font size of the links in the header, on desktop screens.
- Redirecting back to the bets/manage page instead of the dashboard, when a bet is closed.
- The color of the headings on the listings on the bets/manage page.

### Added

- The title of the bet onto the modal when closing the bet.

## [4.0.1] - 25-03-2025

### Unreleased

- Addition of terms_accepted and terms_accepted_on columns to users.
- Requesting of permission to display push notifications to the client.

### Fixed

- Paginator showing the next button when on the last page.
- The pages getting set to NaN on the bets page when clicking on next.
- The localStorage not defined error in the useAppCookies-hook.

### Added

- Check disabling the submit button on the create bet form, when no title or minimum bid is defined, or the status is set to "loading" or "done".
- The cookies as one of the returned fields by useAppCookies.

## [4.0.0] - 25-03-2025

### Unreleased

- Addition of terms_accepted and terms_accepted_on columns to users.

### Fixed

- The cookie notice not being centered on large screens.
- The previous version changelog entry not having the unreleased section.
- The inputs not being styled on the bet list page, and the email reset pages.

### Changed

- The Start Now-button on the landing page to say "Register For Free".
- The text in the sign up-link from "register" to "sign up".
- The appearance of the sign up button in the header.
- The main-tag background-color.
- useSearch now returns an array containing the updateSearch-function, and the status of the search.
- The way useSearch updates the search.

## [3.0.1] - 25-03-2025

### Unreleased

- Addition of terms_accepted and terms_accepted_on columns to users.

### Fixed

- The middleware bypass exploit by upgrading next.js

### Added

- A slide-animation to the hero text.

## [3.0.0] - 21-03-2025

### Unreleased

- Addition of terms_accepted and terms_accepted_on columns to users.

### Added

- The Input-component.
- Checks to make sure passwords have letters, numbers and special characters, when registering.

### Changed

- The background-color of the body.

## [2.6.0] - 17-03-2025

### Added

- Ability to freeze bets.

## [2.5.3] - 16-03-2025

### Changed

- Wrapped the usePlaceBidForm onSubmit-function inside a React useCallback.

## [2.5.2] - 16-03-2025

### Added

- Mention of Google Analytics into the cookie notice.

## [2.5.1] - 16-03-2025

### Fixed

- Incorrect date on the previous changelog-entry from 15-03-2025 to 16-03-2025.
- The confirm-button not being disabled while placing a bid, and not having selected an outcome or when the submission is done.

### Changed

- The value a RadioButton gets set to when it is deselected, back to undefined instead of null.

## [2.5.0] - 16-03-2025

### Added

- Analytics script
- Callback url to logins.
- Server-side check against bidding on an expired bet.
- Check preventing closing of a bet if no outcome has been selected.
- Cookies for enabling or disabling google analytics.

## [2.4.0] - 15-03-2025

### Added

- Limits for the number of bets, bids, and bet outcomes, that can be created by a user.

## [2.3.3] - 15-03-2025

### Fixed

- Build errors on the previous version.

## [2.3.2] - 15-03-2025

### Added

- More tests for user registrations.
- Tests for password resetting.
- The npm scripts test:silent, and test:watch:silent.

### Changed

- Hid the donate-button.

### Removed

- The onClick-handler updating the user's session from the wallet display.

## [2.3.1] - 14-03-2025

### Changed

- Added unique id's to ToggleProvider triggers, and made the logic for closing its target when clicking outside of it,
  not run, if clicking on any of its own triggers. This should fix a problem where attempting to close the target by clicking on
  a trigger outside of it, would instantly re-open it.
- Updated the manifest icons.

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
