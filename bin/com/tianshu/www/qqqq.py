class Solution(object):
    def threeSum(self, nums):
        nums.sort()
        res = []
        n = len(nums)

        for i in range(n - 2):
            # 第一个数去重
            if i > 0 and nums[i] == nums[i - 1]:
                continue

            left = i + 1
            right = n - 1

            while left < right:
                s = nums[i] + nums[left] + nums[right]

                if s < 0:
                    left += 1
                elif s > 0:
                    right -= 1
                else:
                    res.append([nums[i], nums[left], nums[right]])

                    # 跳过重复的 left
                    while left < right and nums[left] == nums[left + 1]:
                        left += 1

                    # 跳过重复的 right
                    while left < right and nums[right] == nums[right - 1]:
                        right -= 1

                    left += 1
                    right -= 1

        return res