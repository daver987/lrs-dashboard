import { supabase } from '@/services/supabase'
import { defineStore, acceptHMRUpdate } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: {},
    userUserName: '',
    userCompanyName: '',
    userCompanyAddress: '',
    userCompanyPhone: '',
    userCompanyEmail: '',
    userCompanyWebsite: '',
    userAvatarUrl: '',
    loading: false,
    src: '',
    path: '',
  }),

  actions: {
    async getProfile() {
      try {
        this.loading = true
        this.user = supabase.auth.user()

        const { data, error, status } = await supabase
          .from('profiles')
          .select(
            `username, website, avatar_url, company_name, company_address, company_phone, company_email`
          )
          .eq('user_id', this.user.id)
          .single()

        if (error && status !== 406) throw error

        if (data) {
          this.userCompanyAddress = data.company_address
          this.userCompanyEmail = data.company_email
          this.userCompanyName = data.company_name
          this.userCompanyPhone = data.company_phone
          this.userUserName = data.username
          this.userCompanyWebsite = data.website
          this.userAvatarUrl = data.avatar_url
        }
      } catch (error) {
        alert(error.message)
      } finally {
        this.loading = false
      }
    },

    async getAvatar() {
      try {
        const { data, error } = await supabase.storage
          .from('avatars')
          .download(this.path)
        if (error) throw error
        this.src = URL.createObjectURL(data)
      } catch (error) {
        console.error('Error downloading image: ', error.message)
      }
    },

    async updateProfile() {
      try {
        this.loading = true
        this.user = supabase.auth.user()

        const updates = {
          user_id: this.user.id,
          username: this.userUserName,
          website: this.userCompanyWebsite,
          avatar_url: this.userAvatarUrl,
          updated_at: new Date(),
          company_name: this.userCompanyName,
          company_address: this.userCompanyAddress,
          company_phone: this.userCompanyPhone,
          company_email: this.userCompanyEmail,
        }

        let { error } = await supabase
          .from('profiles')
          .upsert(updates, {
            returning: 'minimal', // Don't return the value after inserting
          })
          .eq('user_id', this.user.id)

        if (error) throw error
      } catch (error) {
        alert(error.message)
      } finally {
        this.loading = false
      }
    },

    async signOut() {
      try {
        this.loading = true
        let { error } = await supabase.auth.signOut()
        if (error) throw error
      } catch (error) {
        alert(error.message)
      } finally {
        this.loading = false
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
