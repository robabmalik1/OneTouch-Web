import React from 'react'
import { connect } from 'react-redux'

export const marketing = () => {
    return (
        <figure class="bg-gray-100 rounded-xl p-8">
            <img class="w-32 h-32 rounded-full mx-auto" src='assets/images/avatars/Abbott.jpg' alt="" width="384" height="512" />
            <div class="pt-6 space-y-4">
                <blockquote>
                    <p class="text-lg font-semibold">
                        “Not Implemented”
                    </p>
                </blockquote>
                <figcaption class="font-medium">
                    <div>
                        Sarah Dayan
      </div>
                    <div>
                        Staff Engineer, Algolia
      </div>
                </figcaption>
            </div>
        </figure>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(marketing)
