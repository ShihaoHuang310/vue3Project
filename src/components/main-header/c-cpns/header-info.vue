<template>
  <div class="header-info">
    <div class="operation">
      <span
        ><el-icon><Message /></el-icon
      ></span>
      <span>
        <div class="dot"></div>
        <el-icon><ChatDotRound /></el-icon>
      </span>
      <span
        ><el-icon><Search /></el-icon>
      </span>
    </div>
    <div class="info">
      <el-dropdown>
        <span class="user-info">
          <el-avatar :size="30" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          <span class="name">{{ loginStore.userInfo.name }} </span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleExit">
              <el-icon><SwitchButton /></el-icon>
              退出系统
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon><InfoFilled /></el-icon>
              个人信息
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon><Lock /></el-icon>
              修改密码
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { localCache } from '@/utils/cache'
import { TOKEN_KEY, USER_INFO, MENU_INFO } from '@/global/constants'
import { useRouter } from 'vue-router'
import useLoginStore from '@/store/login/login'
const loginStore = useLoginStore()
const router = useRouter()
//退出
const handleExit = () => {
  localCache.removeCache(TOKEN_KEY)
  localCache.removeCache(USER_INFO)
  localCache.removeCache(MENU_INFO)

  router.push('/login')
}
</script>

<style lang="less" scoped>
.header-info {
  display: flex;
  align-items: center;
  .operation {
    display: inline-flex;
    margin-right: 20px;
    span {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 35px;
      &:hover {
        background: #f2f2f2;
      }
      i {
        font-size: 20px;
      }
    }
    .dot {
      position: absolute;
      top: 3px;
      right: 3px;
      z-index: 10;
      width: 6px;
      height: 6px;
      background: red;
      border-radius: 100%;
    }
  }
  .info {
    .user-info {
      display: flex;
      align-items: center;
    }
    .name {
      margin-left: 5px;
      cursor: pointer;
    }
  }
  .info {
    :global(.el-dropdown-menu__item) {
      line-height: 36px !important;
      padding: 6px 22px;
    }
  }
}
</style>
