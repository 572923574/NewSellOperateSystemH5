<style lang="scss" scoped>
    @import './index.scss';
</style>
<template>
    <div>
        <div class="cropper-content">
            <div class="cropper">
                <VueCropper ref="cropper" :img="option.img" :outputSize="option.size" :outputType="option.outputType"
                    :info="true" :full="option.full" :canMove="option.canMove" :canMoveBox="option.canMoveBox"
                    :original="option.original" :autoCrop="option.autoCrop" :autoCropWidth="option.autoCropWidth"
                    :autoCropHeight="option.autoCropHeight" :fixedBox="option.fixedBox" @realTime="realTime" @imgLoad="imgLoad"></VueCropper>
            </div>
            <div class="show-preview" :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden', 'margin': '5px'}">
                <div :style="previews.div" class="preview">
                    <img :src="previews.url" :style="previews.img">
                </div>
            </div>
        </div>
        <div class="footer-btn">
            <div class="scope-btn">
                <label class="btn" for="uploads">选择图片</label>
                <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg"
                    @change="uploadImg($event, 1)">
                <Button type="ghost" @click="changeScale(1)" icon="plus-round"><span style="font-weight: 600;">+</span></Button>
                <Button type="ghost" @click="changeScale(-1)" icon="minus-round"><span style="font-weight: 600;">-</span></Button>
                <Button type="ghost" @click="rotateLeft"><span style="font-weight: 600;">↺</span></Button>
                <Button type="ghost" @click="rotateRight"><span style="font-weight: 600;">↻</span></Button>
            </div>
            <div class="upload-btn">
                <el-button type="primary" @click="down('base64')">上传头像</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    import {
        VueCropper
    } from 'vue-cropper'
    import Api from "@/common/api/api.js";
    export default {
        data() {
            return {
                crap: false,
                previews: {},
                option: {
                    img: '',
                    size: 1,
                    full: false, // 输出原图比例截图 props名full
                    outputType: 'png',
                    canMove: true,
                    original: false,
                    canMoveBox: true,
                    autoCrop: true,
                    centerBox: true,
                    enlarge:5,
                    autoCropWidth: 300,
                    autoCropHeight: 300,
                    fixedBox: true
                },
                downImg: '#'
            }
        },
        components: {
            VueCropper
        },
        methods: {
            changeScale(num) {
                num = num || 1
                this.$refs.cropper.changeScale(num)
            },
            rotateLeft() {
                this.$refs.cropper.rotateLeft()
            },
            rotateRight() {
                this.$refs.cropper.rotateRight()
            },
            finish(type) {
                // 输出
                // var test = window.open('about:blank')
                // test.document.body.innerHTML = '图片生成中..'
                if (type === 'blob') {
                    this.$refs.cropper.getCropBlob(data => {
                        var img = window.URL.createObjectURL(data)
                        this.model = true
                        this.modelSrc = img
                    })
                } else {
                    this.$refs.cropper.getCropData(data => {
                        this.model = true
                        this.modelSrc = data
                    })
                }
            },
            // 实时预览函数
            realTime(data) {
                this.previews = data
            },
            down(type) {
                var _this = this;
                // event.preventDefault()
                var aLink = document.createElement('a')
                aLink.download = 'author-img'
                // 输出
                if (type === 'blob') {
                    _this.$refs.cropper.getCropBlob(data => {
                        console.log(data)
                        _this.downImg = window.URL.createObjectURL(data)
                        //            aLink.download = this.downImg;
                        console.log(this.downImg)
                        aLink.href = window.URL.createObjectURL(data)
                        aLink.click()
                    })
                } else {
                    this.$refs.cropper.getCropData(data => {
                        _this.downImg = data
                        Api.uploadImg({
                                "base64data":data
                            },
                            (resp) => {
                                _this.listLoading = false;
                            }, () => {
                                _this.listLoading = false;
                            },
                            this
                        );
                        _this.$emit('getImg', data);
                    })
                }
            },
            uploadImg(e, num) {
                //上传图片
                // this.option.img
                var _this = this;
                var file = e.target.files[0]
                if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
                    alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
                    return false
                }
                var reader = new FileReader(file)
                reader.onload = e => {
                    let data
                    if (typeof e.target.result === 'object') {
                        // 把Array Buffer转化为blob 如果是base64不需要
                        data = window.URL.createObjectURL(new Blob([e.target.result]))
                    } else {
                        data = e.target.result
                    }
                    _this.option.img = data
                }

                // 转化为base64
                reader.readAsDataURL(file)
                // 转化为blob
                // reader.readAsArrayBuffer(file)
            },
            imgLoad(msg) {
                console.log(msg)
            }
        }
    }
</script>