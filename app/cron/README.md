# Cron

## Permissions Issues

- All .sh files needs to have execution permissions in order to run
- All .sh files in these folder/subfolder have 755 execution permissions
- You can give permissions via git with these commands:

      755 custom permission - `git update-index --chmod=+x <script-name>`

      644 default permission - `git update-index --chmod=-x <script-name>`

      list file permissions - `git ls-files --stage`

- You need to check permissions constantly (if you move the files git reverts them to 644 state)

## WARNING

If you add execution permissions with git commands, all the users will be able to execute the files in the deployment server. You should review those permissions before going into production
