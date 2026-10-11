# AGENTS
- News stories live in the `news_stories` table; the `fetch-daily-news` function adds 6 per day from source feeds via a daily scheduled job. Why: stories must persist and grow automatically; the bundled list is only a fallback.
- Roles live in `user_roles` (super_admin, admin, editor) checked via security-definer helpers; the super admin is assigned by the signup trigger and can't be removed or banned. Why: prevents privilege escalation.
- Adding members goes through the `admin-add-member` function (invite by email). Why: creating accounts needs server-side privileges.
- Avatars are emoji presets or provider photo links, no file uploads. Why: the workspace blocks public storage.
- Moderation actions are logged by database triggers and the `clear_user_chat` function into `moderation_log`. Why: the log can't be skipped or faked from the browser.
- The AI chat check runs in the `moderate-chat` function, which loads messages server-side and is staff-only. Why: keeps the AI key and prompt off the browser.
- Song requests and contact messages are public-insert, staff-read tables. Why: visitors submit without accounts.
