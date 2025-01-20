# Rules on collaborating

***THE TEN COMMANDMENTS OF `git` COLLABORATION***
- You shall **not work in the main branch** (`main`, `master`, `dev`...); instead branch off and name it accordingly (e.g. `feature-make-index-html`, `feature-db-schema`, `patch-fix-xz-backdoor`...), and **after completion** merge back
- `pull` first, **then** `merge` (if necessary), **then** `push`
- Too many commits **are better than** too few
- Commit messages conform to **an agreed-upon format** (e.g. `Added index.html`, `ADDED: index.html`, `FIXES: <github issue number>`...), so the author of a commit cannot be identified based on its message alone
- Commit messages should summarize what changed, either directly, or with a link to a github issue that does so; message "`commit`" is **unacceptable**
- Names of branches conform to **an agreed-upon format** (e.g. `feature-make-index-html`, `feature-db-schema`, `patch-fix-xz-backdoor`...)
- Nuances (things needing explanation) belong into **source code comments, not commit messages**
- If it is unclear without comments what the code does, it is **poorly written**
- Comments rather describe **why** (e.g. why selection sort, if quick sort appears to be faster), and for APIs **how to use them** (javadoc, doxygen, docstrings...)
- Even in a solo project there are **at least three collaborators**: **past self**, **present self**, and **future self**

[TODO: additonal rules, e.g. format of commits, branches, ..., here]