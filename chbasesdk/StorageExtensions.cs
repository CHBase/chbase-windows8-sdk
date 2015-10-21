// (c) Microsoft. All rights reserved
using Windows.Foundation.Collections;
using Windows.Storage;

namespace CHBase.Foundation
{
    public static class StorageExtensions
    {
        public static IPropertySet GetLocalPropertySet(this ApplicationData appData, string name)
        {
            return appData.LocalSettings.CreateContainer(name, ApplicationDataCreateDisposition.Always).Values;
        }
    }
}